import { Component, OnInit } from "@angular/core";
import { timeStamp } from "console";
import * as data from "./data.json";
import { Router } from "@angular/router";
import { StorageService } from "../../../core/services";
import { globalShortcut } from "electron";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { FlatpickrOptions } from "ng2-flatpickr";
import { runInThisContext } from "vm";

@Component({
  selector: "app-marketplace",
  templateUrl: "./marketplace.component.html",
  styleUrls: ["./marketplace.component.scss"],
})
export class MarketplaceComponent implements OnInit {
  GlobalShortcut: any = globalShortcut;
  marketplaceCardList: Array<any> = [];
  cartList: Array<any> = [];
  selectedCardIdList: Array<any> = [];
  selectedSweepOption: any = 1;
  serachText: any = null;
  sortBy: any = 0;
  selectedCompany: any = null;
  showFilter: boolean = false;
  selectedCount: number = 0;
  sweepValue: number = 0

  SortListBy = [
    { value: 0, label: "Sort by" },
    { value: 1, label: "Price (ascending)" },
    { value: 2, label: "Price (descending)" },
    { value: 3, label: "Newest listings" },
    { value: 4, label: "Oldest listings" },
  ];

  priceTypeList = [
    { value: 0, label: "USD" },
  ];

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
    { value: "5", label: "KSA" },
    { value: "6", label: "Egypt" },
    { value: "7", label: "Australiya" },
    { value: "8", label: "Singapore" },
  ];

  technologyList = [
    { value: "1", label: "Solar" },
    { value: "2", label: "Wind" },
    { value: "3", label: "Hydro" },
    { value: "4", label: "Nuclear" },
    { value: "5", label: "Geothermal" },
  ];

  issueFromDate: any = null;
  issueToDate: any = null;

  filterForm: FormGroup;
  selectedFilters: Array<any> = [];

  datepickerOptions: FlatpickrOptions = {
    dateFormat: 'd-m-Y'
  };

  constructor(private router: Router, private storage: StorageService) {

    this.filterForm = new FormGroup({
      minPrice: new FormControl(null, []),
      maxPrice: new FormControl(null, []),
      issueFromDate: new FormControl(null, []),
      issueToDate: new FormControl(null, []),
      expiryFromMonth: new FormControl(null, []),
      expiryToMonth: new FormControl(null, []),
      selectedTechnology: new FormArray([], []),
      selectedCountry: new FormArray([], []),
      priceType: new FormControl(0)
    });
  }

  ngOnInit(): void {
    // this.setShortCutKey();
    this.getMarketplaceCardList();
  }

  setShortCutKey() {
    this.GlobalShortcut.register("Alt+CommandOrControl+A", () => {
      console.log("Alt+CommandOrControl+A Pressed!");
    });
  }

  getMarketplaceCardList() {
    this.marketplaceCardList = (data as any).default;
    if (this.serachText) {
      this.marketplaceCardList = this.marketplaceCardList.filter((ele) => {
        if (
          ele.title.toLowerCase().indexOf(this.serachText.toLowerCase()) !==
          -1 ||
          ele.company.name
            .toLowerCase()
            .indexOf(this.serachText.toLowerCase()) !== -1
        ) {
          return ele;
        }
      });
    }

    if (this.filterForm.value.minPrice
      || this.filterForm.value.maxPrice
      || this.filterForm.value.selectedTechnology.length
      || this.filterForm.value.selectedCountry.length) {
      this.marketplaceCardList = this.marketplaceCardList.filter(ele => {
        let filterd = true;
        if (filterd && this.filterForm.value.minPrice && parseFloat(ele.price) < parseFloat(this.filterForm.value.minPrice)) {
          filterd = false;
        }
        if (filterd && this.filterForm.value.maxPrice && parseFloat(ele.price) > parseFloat(this.filterForm.value.maxPrice)) {
          filterd = false;
        }

        if (filterd && this.filterForm.value.selectedTechnology.length && !this.filterForm.value.selectedTechnology.includes(ele.technology.value)) {
          filterd = false;
        }

        if (filterd && this.filterForm.value.selectedCountry.length && !this.filterForm.value.selectedCountry.includes(ele.country.id)) {
          filterd = false;
        }

        // if(filterd &&  this.filterForm.value.selectedTechnology.length && !this.filterForm.value.selectedTechnology.includes(ele.technology.value) ){
        //   filterd = false;
        // }

        if (filterd) {
          return ele
        }

      })
    }

  }

  onSearch() {
    this.getMarketplaceCardList();
  }

  selectCompany(company: any) {
    this.selectedCompany = company;
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

  applySortBy() {
    if (this.sortBy === 0) {
      //code to get the items in default order
      this.marketplaceCardList.sort(function (a, b) {
        return a.id - b.id;
      });
    }
    else if (this.sortBy == 1) {
      this.marketplaceCardList.sort(function (a, b) {
        return a.price - b.price || a.title.localeCompare(b.title);
      });
    } else if (this.sortBy == 2) {
      this.marketplaceCardList.sort(function (a, b) {
        return b.price - a.price || a.title.localeCompare(b.title);
      });
    } else if (this.sortBy == 3) {
      this.marketplaceCardList.sort(function (a, b) {
        return a.id - b.id || a.title.localeCompare(b.title);
      });
    } else if (this.sortBy == 4) {
      this.marketplaceCardList.sort(function (a, b) {
        return b.id - a.id || a.title.localeCompare(b.title);
      });
    }
  }

  onSelectCard(marketplaceCard: any) {
    if (!this.selectedCardIdList.includes(marketplaceCard.id)) {
      this.addToCart(marketplaceCard)
    }
    else {
      this.cartList = this.cartList.filter(ele => ele.id != marketplaceCard.id);
      this.selectedCardIdList = this.selectedCardIdList.filter(ele => ele != marketplaceCard.id)
    }

    this.updateSelectedCount();

    if (this.selectedSweepOption == 1) {
      this.sweepValue = this.cartList.length;
    }
    else {
      this.sweepValue = this.getTotalCost();
    }

  }

  updateSelectedCount() {
    this.selectedCount = this.getTotalCount();
    if (!this.selectedCount) {
      this.sweepValue = 0;
    }
  }

  updateCartItems() {

  }

  goToCheckout() {
    this.storage.set('marketplace-cart-data', { totalItems: this.getTotalCartItems(), totalCost: this.getTotalCost(), avgUnitCost: this.getAvgUnitCost() });
    this.router.navigate(['/pages/marketplace/checkout']);
  }

  addToCart(cartItem: any) {
    this.cartList.push(cartItem);
    this.selectedCardIdList.push(cartItem.id)
  }

  clearCart() {
    this.cartList = [];
    this.selectedCardIdList = [];
    this.updateSelectedCount();
  }

  getTotalCartItems() {
    return this.cartList.length || 0;
  }

  getTotalCost() {
    return this.cartList.reduce((a, b) => +a + +b.price, 0);
  }

  getAvgUnitCost() {
    let totalCartItems = this.getTotalCartItems();
    let totalCost = this.getTotalCost()

    return totalCartItems ? (totalCost / totalCartItems).toFixed(2) : 0;
  }
  selectSweepOption(val: number) {
    this.selectedSweepOption = val;
    this.updateSweepModeValue()
  }

  getTotalCount() {
    if (this.selectedSweepOption == 1) {
      return this.cartList.length;
    } else {
      return this.getTotalCost();
    }
  }

  updateSweepModeValue() {

    if (this.selectedSweepOption == 1) {

      if (this.cartList.length) {

        let cardTypes = this.cartList.map(a => a.cardType);

        this.cartList = [];
        this.selectedCardIdList = [];

        this.marketplaceCardList.forEach((cardItem) => {

          if (cardTypes.includes(cardItem.cardType)) {
            if (this.cartList.length < this.sweepValue) {
              this.addToCart(cardItem);
            }
          }
        })

        this.sweepValue = this.cartList.length;

      }
    }
    else {

      if (this.cartList.length) {

        let cardTypes = this.cartList.map(a => a.cardType);

        this.cartList = [];
        this.selectedCardIdList = [];
        let totalCost = 0
        this.marketplaceCardList.forEach((cardItem) => {

          if (cardTypes.includes(cardItem.cardType)) {
            if (totalCost + cardItem.price <= this.sweepValue) {
              this.addToCart(cardItem);
              totalCost += cardItem.price
            }
          }
        })

        this.sweepValue = this.getTotalCost();

      }
    }
  }

  getMinSweepValue() {
    return 0
  }

  getMaxSweepValue() {
    let cardTypes = this.cartList.map(a => a.cardType);

    if (this.selectedSweepOption == 1) {
      return this.marketplaceCardList.filter((ele) => {
        if (cardTypes.includes(ele.cardType)) {
          return ele;
        }
      }).length;
    }
    else {
      return this.marketplaceCardList.filter((ele) => {
        if (cardTypes.includes(ele.cardType)) {
          return ele;
        }
      }).reduce((a, b) => +a + +b.price, 0);
    }
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
    if (this.showFilter) {
      console.log("(FILTER)this.filterForm.value: ", this.filterForm.value);
    }
  }

  updateSelectedFilters() {
    this.selectedFilters = [];

    if (this.filterForm.value.minPrice) {
      this.selectedFilters.push({
        'value': this.filterForm.value.minPrice,
        'label': 'Min Price',
        'field': 'minPrice'
      })
    }
    if (this.filterForm.value.maxPrice) {
      this.selectedFilters.push({
        'value': this.filterForm.value.maxPrice,
        'label': 'Max Price',
        'field': 'maxPrice'
      })
    }
    if (this.filterForm.value.issueFromDate) {
      this.selectedFilters.push({
        'value': this.filterForm.value.issueFromDate,
        'label': 'Issue From',
        'field': 'issueFromDate'
      })
    }
    if (this.filterForm.value.issueToDate) {
      this.selectedFilters.push({
        'value': this.filterForm.value.issueToDate,
        'label': 'Issue To',
        'field': 'issueToDate'
      })
    }
    if (this.filterForm.value.expiryFromMonth) {
      this.selectedFilters.push({
        'value': this.filterForm.value.expiryFromMonth,
        'label': 'Expiry From',
        'field': 'expiryFromMonth'
      })
    }
    if (this.filterForm.value.expiryToMonth) {
      this.selectedFilters.push({
        'value': this.filterForm.value.expiryToMonth,
        'label': 'Expiry To',
        'field': 'expiryToMonth'
      })
    }
    if (this.filterForm.value.selectedTechnology.length) {
      this.selectedFilters.push({
        'value': this.technologyList.filter(ele => this.filterForm.value.selectedTechnology.includes(ele.value)),
        'label': 'Selected Technology',
        'field': 'selectedTechnology'
      })
    }
    if (this.filterForm.value.selectedCountry.length) {
      this.selectedFilters.push({
        'value': this.countryList.filter(ele => this.filterForm.value.selectedCountry.includes(ele.value)),
        'label': 'Selected Country',
        'field': 'selectedCountry'
      })
    }
    this.filterForm.value
  };

  removeFilter(field: string, value: any) {
    console.log("(removeFilter)field: ", field);
    console.log("(removeFilter)value: ", value);

    if (field == 'selectedTechnology') {
      const formArray: FormArray = this.filterForm.get('selectedTechnology') as FormArray;
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    else if (field == 'selectedCountry') {
      const formArray: FormArray = this.filterForm.get('selectedCountry') as FormArray;
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    else {

      this.filterForm.patchValue({
        [field]: null
      })

    }

    this.updateSelectedFilters();
    this.getMarketplaceCardList();

  }

  resetFilter() {
    this.filterForm.patchValue({
      minPrice: null,
      maxPrice: null,
      issueFromDate: null,
      issueToDate: null,
      expiryFromMonth: null,
      expiryToMonth: null,
    })


    const techArray: FormArray = this.filterForm.get('selectedTechnology') as FormArray;
    while (techArray.length !== 0) {
      techArray.removeAt(0)
    }

    const countryArray: FormArray = this.filterForm.get('selectedCountry') as FormArray;
    while (countryArray.length !== 0) {
      countryArray.removeAt(0)
    }

    this.updateSelectedFilters();

    this.getMarketplaceCardList();
    this.showFilter = !this.showFilter;
  }

  onFilterSubmit() {
    this.showFilter = false;
    this.filterForm.patchValue({
      'issueFromDate': this.filterForm.value.issueFromDate ? this.formatDate(this.filterForm.value.issueFromDate[0]) : null,
      'issueToDate': this.filterForm.value.issueToDate ? this.formatDate(this.filterForm.value.issueToDate[0]) : null,
    })

    console.log("(submit)this.filterForm.value: ", this.filterForm.value);
    this.updateSelectedFilters();
    this.getMarketplaceCardList();
  }

  formatDate(date: any) {
    if (!date) {
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
