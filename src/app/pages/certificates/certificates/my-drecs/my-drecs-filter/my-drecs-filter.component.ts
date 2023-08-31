import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';

@Component({
  selector: 'app-my-drecs-filter',
  templateUrl: './my-drecs-filter.component.html',
  styleUrls: ['./my-drecs-filter.component.scss']
})
export class MyDrecsFilterComponent implements OnInit {

  showFilter: boolean = false;

  monthList = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  countryList = [
    { value: "1", label: "UAE" },
    { value: "2", label: "Japan" },
    { value: "3", label: "Brazil" },
    { value: "4", label: "India" },
  ];

  technologyList = [
    { value: "1", label: "Solar" },
    { value: "2", label: "Wind" },
    { value: "3", label: "Hydro" },
    { value: "4", label: "Nuclear" },
    { value: "5", label: "Geothermal" },
  ];

  actionList = [
    { value: "1", label: "Listed" },
    { value: "2", label: "Unlisted" },
    { value: "3", label: "Staked" },
    { value: "4", label: "Unstaked" },
  ];


  issueFromDate: any = null;
  issueToDate: any = null;

  filterForm: FormGroup;

  datepickerOptions: FlatpickrOptions = {
    dateFormat: 'd-m-Y'
  };
  constructor() {

    this.filterForm = new FormGroup({
      issueFromDate: new FormControl(null, []),
      issueToDate: new FormControl(null, []),
      expiryFromMonth: new FormControl(null, []),
      expiryToMonth: new FormControl(null, []),
      selectedTechnology: new FormArray([], []),
      selectedCountry: new FormArray([], []),
      selectedAction: new FormArray([], []),

    });
   }

  ngOnInit(): void {
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

  onActionChange(event: any) {
    const formArray: FormArray = this.filterForm.get('selectedAction') as FormArray;
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


  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  onFilterSubmit() {
    this.showFilter = false;
    this.filterForm.patchValue({
      'issueFromDate': this.filterForm.value.issueFromDate ? this.formatDate(this.filterForm.value.issueFromDate[0]) : null,
      'issueToDate': this.filterForm.value.issueToDate ? this.formatDate(this.filterForm.value.issueToDate[0]) : null,
    })
    
    console.log("(submit)this.filterForm.value: ", this.filterForm.value);

  }


  resetFilter() {
    this.filterForm.patchValue({
      issueFromDate: null,
      issueToDate: null,
      expiryFromMonth: null,
      expiryToMonth: null,
    })

    const actionArray: FormArray = this.filterForm.get('selectedAction') as FormArray;
    while (actionArray.length !== 0) {
      actionArray.removeAt(0)
    }

    const techArray: FormArray = this.filterForm.get('selectedTechnology') as FormArray;
    while (techArray.length !== 0) {
      techArray.removeAt(0)
    }

    const countryArray: FormArray = this.filterForm.get('selectedCountry') as FormArray;
    while (countryArray.length !== 0) {
      countryArray.removeAt(0)
    }
    this.showFilter = !this.showFilter;
  }

  formatDate(date:any){
    if(!date){
      return null
    }
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [day, month, year].join('-')
  }
}
