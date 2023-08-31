import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  
  contactUsForm: FormGroup;
 
  loading: boolean;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {

    this.contactUsForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(form: FormGroup) {
    this.location.back();

  }
}
