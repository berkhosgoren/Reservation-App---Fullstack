export interface Reservation {
    name: string;
    surname: string;
    phoneNumber: string;
    resCause: string;
    resDate: string;
    confirmationId?: string; // optional – added later from backend
  }
  