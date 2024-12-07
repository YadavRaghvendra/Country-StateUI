import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  public showAlert(message: string, type: 'success' | 'error' = 'success') {
    const prefix = type === 'success' ? '✅' : '❌';
    alert(`${prefix} ${message}`);
  }

// Function to format the date
public formatDate(dateInput: string | Date): string {
  if (!dateInput) return ''; 

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';
  const day = date.getDate().toString().padStart(2, '0'); 
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
}