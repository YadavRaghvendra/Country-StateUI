import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../models/state-model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private apiUrl = 'https://localhost:7171/api/State';  // Replace with actual API URL

  constructor(private http: HttpClient) {}

  getStates(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getStateById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createState(state: any): Observable<State> {
    return this.http.post<State>(this.apiUrl, state);
  }


  updateState(id: number, state: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, state);
  }

  deleteState(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
