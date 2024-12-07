import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Country, State } from '../../models/country-state-dto';
import { StateService } from '../../services/state.service';
import { CountryService } from '../../services/country.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './state.component.html',
  styleUrl: './state.component.css',
  providers: [StateService, CountryService]
})
export class StateComponent implements OnInit{

  form!: FormGroup;
  states: State[] = [];
  formBuilder: any;
  currentStateId: number = 0;
  countries: Country[] = [];

  constructor(private fb: FormBuilder, public commonService: CommonService, private stateService: StateService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getStates();
    this.getCountries();
  }
  initializeForm(): void {
    this.form = this.fb.group({
      countryId: ['', Validators.required],
      stateName: ['', Validators.required],
      stateCode: ['', Validators.required]
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

  getStates() {
    this.stateService.getStates().subscribe({
      next: (data) => {
        this.states = data;
      },
      error: (e) => console.error(e)
    });
  }

  resetForm(): void {
    this.form.reset({
      countryId: '' 
    });
    this.currentStateId = 0;
  }

  upsertState(): void {
    if (this.form.valid) {
      if (this.currentStateId) {
        const state = {
          ...this.form.value,
          id:this.currentStateId
        };
        this.stateService.updateState(this.currentStateId, state).subscribe({
          next: (response: any) => {
            const message = response?.message || 'State updated successfully!';
            this.commonService.showAlert(message, 'success');
            this.getStates();
            this.resetForm();
          },
          error: (error) => {
            const errorMessage = error?.error?.message || 'An error occurred while updating the state.';
            this.commonService.showAlert(errorMessage, 'error');
          }
        });
      } else {
        this.stateService.createState(this.form.value).subscribe({
          next: (response: any) => {
            const message = response?.message || 'State created successfully!';
            this.commonService.showAlert(message, 'success');
            console.log(message);
            this.getStates();
            this.resetForm();
          },
          error: (error) => {
            const errorMessage = error?.error?.message || 'An error occurred while creating the state.';
            this.commonService.showAlert(errorMessage, 'error');
          }
        });
      }
    } else {
      console.error('Form is invalid. Please check the form fields.');
    }
  }

  editState(state: State): void {
    this.form.patchValue({
      countryId: state.countryId,
      stateName: state.stateName,
      stateCode: state.stateCode
    });
    this.currentStateId = state.id;
  }

 getCountryNameById(countryId: number): string {
  const country = this.countries.find(c => c.id == countryId);
  if (country) {
    return country.countryName;
  } else {
    return ''; 
  }
}
  
  deleteCountry(stateId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this state?');
    if (!confirmDelete) {
      console.log('Delete operation cancelled by user.');
      return;
    }  
    this.stateService.deleteState(stateId).subscribe({
      next: (response: any) => {
        this.getStates();
        const message = response?.message || 'State deleted successfully!';
        this.commonService.showAlert(message, 'success');       
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'An error occurred while deleting the country.';
        this.commonService.showAlert(errorMessage, 'error');
      }
    });
  }


}
