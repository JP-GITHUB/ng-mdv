import { Component, OnInit } from '@angular/core';
import { ContactForm } from './contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm = ContactForm;

  constructor() { }
  
  ngOnInit() {
  }

}
