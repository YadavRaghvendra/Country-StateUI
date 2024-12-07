import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country-state-dto';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuntry',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,CommonModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css',
  providers: [CountryService]
})
export class CountryComponent implements OnInit {

  form!: FormGroup;
  countries: Country[] = [];
  formBuilder: any;
  currentCountryId: number = 0;

  constructor(private fb: FormBuilder, private countryService: CountryService, public commonService: CommonService) { }
  ngOnInit(): void {
    this.getCountries();
    this.initializeForm();
  }
  initializeForm(): void {
    this.form = this.fb.group({
      countryName: ['', Validators.required],
      countryCode: ['', Validators.required],
    });

  }

  getCountries() {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        console.log(this.countries);
      },
      error: (e) => console.error(e)
    });
  }

  resetForm(): void {
    this.form.reset();
    this.currentCountryId = 0; // Reset the ID for creating a new country
  }

  addNewCountry(): void {
    if (this.form.valid) {
      if (this.currentCountryId) {
        const country = {
          ...this.form.value,
          id: this.currentCountryId
        };
        this.countryService.updateCountry(this.currentCountryId, country).subscribe({
          next: (response: any) => {
            const message = response?.message || 'Country updated successfully!';
            this.commonService.showAlert(message, 'success');
            console.log(message);
            this.getCountries();
            this.resetForm();
          },
          error: (error) => {
            const errorMessage = error?.error?.message || 'An error occurred while updating the country.';
            this.commonService.showAlert(errorMessage, 'error');
            console.error('Error updating country:', error);
          }
        });
      } else {
        this.countryService.addCountry(this.form.value).subscribe({
          next: (response) => {
            const message = response?.message || 'Country created successfully!';
            this.commonService.showAlert(message, 'success');
            console.log(message);
            this.getCountries();
            this.resetForm();
          },
          error: (error) => {
            const errorMessage = error?.error?.message || 'An error occurred while creating the country.';
            this.commonService.showAlert(errorMessage, 'error');
          }
        });
      }
    } else {
      console.error('Form is invalid. Please check the form fields.');
    }
  }

  editCountry(country: Country): void {
    this.form.patchValue({
      countryName: country.countryName,
      countryCode: country.countryCode
    });
    this.currentCountryId = country.id;
  }

  deleteCountry(countryId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this country?');
    if (!confirmDelete) {
      console.log('Delete operation cancelled by user.');
      return;
    }  
    this.countryService.deleteCountry(countryId).subscribe({
      next: (response: any) => {
        const message = response?.message || 'Country deleted successfully!';
        this.commonService.showAlert(message, 'success');
        console.log(message);
        this.getCountries(); // Refresh the country list
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'An error occurred while deleting the country.';
        this.commonService.showAlert(errorMessage, 'error');
        console.error('Error deleting country:', error);
      }
    });
  }

}
