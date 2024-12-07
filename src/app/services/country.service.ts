import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Make sure HttpClient is imported
import { Observable } from 'rxjs';
import { Country } from '../models/country-state-dto';  // Assuming CountryDto is defined

@Injectable({
  providedIn: 'root'  // Ensures it's available throughout the app
})
export class CountryService {
  private apiUrl = 'https://localhost:7171/api/Country';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCountryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addCountry(country: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, country);
  }

  updateCountry(id: number, country: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, country);
  }

  deleteCountry(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
