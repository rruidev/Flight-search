import { Component } from '@angular/core';
import { FlightInformation } from './flight-information';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from './search.service';
import { SearchRequest } from './search-request';
import { error } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public searchResults: Array<FlightInformation> = [];
  public searchForm: FormGroup;
  public isFormValid: boolean;
  public url: string;
  public errorMsg: string;

  constructor(private fb: FormBuilder, private searchService: SearchService) {
    this.createForm();
    this.searchForm.valueChanges.subscribe(this.searchFormValidatior.bind(this));
  }

  createForm() {
    this.searchForm = this.fb.group({
      flightNumber: [''],
      origin: [''],
      destination: [''],
      date: ['', Validators.required]
    });
    console.log("FORM Details:    *****      " + this.searchForm);
  }

  searchFormValidatior() {
    const formValue: SearchRequest = this.searchForm.value;
    this.isFormValid = false;
    this.errorMsg = "";
    // if the flight number is present || origin and dest is present then it passes the first validation
    if (formValue.flightNumber || (formValue.destination && formValue.origin)) {
      // passes validation one
      if (formValue.date) {
        this.isFormValid = true;
      } else {
        this.errorMsg = "*Date is mandatory";
      }
    } else {
      this.errorMsg = "*Also enter - Flight Number OR Origin and Destination Details";
    }
  }


  searchForFlights() {
    const selectedForm = this.searchForm.value;
    this.searchService.getFlightData(this.searchForm.value).subscribe(resp => {
      this.searchResults = resp;
    });
  }
}