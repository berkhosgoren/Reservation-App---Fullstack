import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7252';

  constructor(private http: HttpClient) { }

  
  // Sends a new reservation to the API
  addReservation(reservation: any): Observable<any> {
    const http = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.http.post(`${this.apiUrl}/api/ResInfo/AddReservation`, reservation);
    
  }

  // Fetches a reservation by confirmation ID
  getReservation(confirmationId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(`${this.apiUrl}/api/ResInfo/GetReservation/${confirmationId}`, httpOptions);
  }
  
  // Cancels a reservation by confirmation ID
  cancelReservation(confirmationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/ResInfo/CancelReservation/${confirmationId}`);
  }

}
