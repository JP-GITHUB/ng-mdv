import { Component, OnInit } from '@angular/core';
import { ContactForm } from './contact';
import { ContactService} from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers : [ContactService]
})
export class ContactComponent implements OnInit {
  contactForm = ContactForm;
  editForm = ContactForm;

  constructor(private contactService : ContactService ) { }

  ngOnInit() {
  }

  add(contactForm: ContactForm): void {
    this.editForm = undefined;
    console.log(ContactForm);
    // The server will generate the id for this new hero
    const newContact: ContactForm = contactForm as ContactForm;
    this.contactService.addContact(newContact)
      .subscribe();
  }
}
