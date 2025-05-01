import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { ConfirmationService } from 'primeng/api';
import { Reservation } from './models/reservation.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  confirmationId: string = '';
  reservationDetails: Reservation | null = null;

  today: string = new Date().toISOString().split('T')[0];

  displayCheckResForm: boolean = false;
  displayNewResForm: boolean = false;
  confirmDialogVisible: boolean = false;

  activeStep: number = 0;

  errorMessage: string | null = null;
  cancelMessage: string | null = null;
  successMessage: string | null = null;

  reservation: Reservation = {
    name: '',
    surname: '',
    phoneNumber: '',
    resCause: '',
    resDate: '',
    confirmationId: ''
  };

  steps: any[] = [
    { label: 'Enter Details' },
    { label: 'Confirm' },
    { label: 'Confirmation' }
  ];

  title = 'ResSystem';

  constructor(private apiService: ApiService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.resetReservationForm();
  }

  resetReservationForm() {
    this.reservation = {
      name: '',
      surname: '',
      phoneNumber: '',
      resCause: '',
      resDate: '',
      confirmationId: ''
    };
  }

  isValidPhoneNumber(): boolean {
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    return this.reservation.phoneNumber ? phonePattern.test(this.reservation.phoneNumber) : false;
  }

  isPastDate(): boolean {
    return new Date(this.reservation.resDate) < new Date();
  }

  openNewReservationDialog(): void {
    this.displayNewResForm = true;
    this.displayCheckResForm = false;
    this.resetReservationForm();
  }

  openCheckReservationDialog(): void {
    this.displayCheckResForm = true;
    this.displayNewResForm = false;
  }

  closeDialogs(): void {
    this.displayNewResForm = false;
    this.displayCheckResForm = false;
  }

  goToNextStep() {
    if (this.activeStep < this.steps.length - 1) {
      this.activeStep++;
    }
  }

  goToPreviousStep() {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  confirmReservation(nextCallback: any) {
    this.apiService.addReservation(this.reservation).subscribe(
      (response: any) => {
        this.reservation.confirmationId = response.reservation.confirmationId;
        console.log("API Response:", response);
        console.log("Confirmation ID:", this.reservation.confirmationId);
        nextCallback.emit();
      },
      (error: any) => {
        console.error("Error confirming reservation:", error);
      }
    );
  }

  isFormValid(): boolean {
    if (!this.displayNewResForm) {
      return true;
    }
    return (
      !!this.reservation.name &&
      !!this.reservation.surname &&
      this.isValidPhoneNumber() &&
      !!this.reservation.resCause &&
      !!this.reservation.resDate &&
      !this.isPastDate()
    );
  }

  checkReservation(): void {
    this.apiService.getReservation(this.confirmationId).subscribe({
      next: (data) => {
        this.reservationDetails = data;
        this.errorMessage = null;
        this.cancelMessage = null;
      },
      error: (err) => {
        if (err.status === 404) {
          this.errorMessage = "Reservation not found";
        } else {
          this.errorMessage = "An unexpected error occurred. Please try again.";
        }
        this.reservationDetails = null;
      }
    });
  }

  cancelReservation(): void {
    this.apiService.cancelReservation(this.confirmationId).subscribe({
      next: (response) => {
        this.cancelMessage = "Reservation canceled successfully.";
        this.errorMessage = null;
        this.reservationDetails = null;
        this.confirmDialogVisible = false;
        this.displayCheckResForm = false;
      },
      error: (err) => {
        this.cancelMessage = null;
        this.errorMessage = 'An error occurred while canceling the reservation.';
        this.confirmDialogVisible = false;
      }
    });
  }

  confirmCancellationDialog(): void {
    this.confirmDialogVisible = true;
  }

  reject(): void {
    this.confirmDialogVisible = false;
    console.log('You rejected the cancellation');
  }
}
