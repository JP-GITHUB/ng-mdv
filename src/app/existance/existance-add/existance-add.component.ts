import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ExistanceService } from 'src/app/_services/existance.service';

@Component({
  selector: 'app-existance-add',
  templateUrl: './existance-add.component.html',
  styleUrls: ['./existance-add.component.css']
})
export class ExistanceAddComponent implements OnInit {

  closeResult: string;
  addForm: FormGroup;
  loading = false; //Utilizar para deshabilitar el boton de guardar, antySpam best choice award
  submitted = false;
  returnUrl: String;
  private schools: any;
  private genders: any;

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
