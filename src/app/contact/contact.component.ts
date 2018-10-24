import { Component, OnInit } from '@angular/core';
//import { ContactForm } from './contact';
import { ContactService } from './contact.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      contact: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  get f() { return this.contactForm.controls; }

  send(): void {

    if(this.contactForm.invalid){
      console.log("Se muricio!");
      return;
    }
    
    console.log(this.f);
  }

}
