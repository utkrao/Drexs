import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';

@Component({
  selector: 'app-stacked-drecs-filter',
  templateUrl: './stacked-drecs-filter.component.html',
  styleUrls: ['./stacked-drecs-filter.component.scss']
})
export class StackedDrecsFilterComponent implements OnInit {

  showFilter: boolean = false;

  countryList = [
    { value: "1", label: "UAE" },
    { value: "2", label: "Japan" },
    { value: "3", label: "Brazil" },
    { value: "4", label: "India" },
    { value: "5", label: "KSA" },
    { value: "6", label: "Egypt" },
    { value: "7", label: "Austrailia" },
    { value: "8", label: "Singapore" },
  ];

  technologyList = [
    { value: "1", label: "Solar" },
    { value: "2", label: "Wind" },
    { value: "3", label: "Hydro" },
    { value: "4", label: "Nuclear" },
    { value: "5", label: "Geothermal" },
  ];

  dateFilterOption = [
    { value: "1", label: "Newest" },
    { value: "2", label: "Oldest" },
  ];


  filterForm: FormGroup;

  datepickerOptions: FlatpickrOptions = {
    dateFormat: 'd-m-Y'
  };

  constructor() {
    this.filterForm = new FormGroup({
      dateOption: new FormControl(null, []),
      selectedTechnology: new FormArray([], []),
      selectedCountry: new FormArray([], []),

    });
  }

  ngOnInit(): void {
  }


  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  onFilterSubmit() {
    this.showFilter = false;
    console.log("(submit)this.filterForm.value: ", this.filterForm.value);
  }


  resetFilter() {

    const techArray: FormArray = this.filterForm.get('selectedTechnology') as FormArray;
    while (techArray.length !== 0) {
      techArray.removeAt(0)
    }

    const countryArray: FormArray = this.filterForm.get('selectedCountry') as FormArray;
    while (countryArray.length !== 0) {
      countryArray.removeAt(0)
    }
    this.filterForm.patchValue({
      "dateOption":null
    })

    this.showFilter = !this.showFilter;
  }



  onTechnologyChange(event: any) {
    const formArray: FormArray = this.filterForm.get('selectedTechnology') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    }
    else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onDateOptionChange(event: any) {
    this.filterForm.patchValue({
      "dateOption": event.target.value
    });
  }


  onCountryChange(event: any) {
    const formArray: FormArray = this.filterForm.get('selectedCountry') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    }
    else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
