import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ExistanceService } from 'src/app/_services/existance.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-existance-edit',
  templateUrl: './existance-edit.component.html',
  styleUrls: ['./existance-edit.component.css']
})
export class ExistanceEditComponent implements OnInit {
  @ViewChild('content') content;

  closeResult: string;
  editForm: FormGroup;
  loading = false; //Utilizar para deshabilitar el boton de guardar.
  submitted = false;
  returnUrl: String;
  private productId: number;
  private sizeId: number;

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private existanceService: ExistanceService,
    private notifierService: NotifierService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  get dataForm() { return this.editForm.controls; }

  open(product_id, size_id, price, quantity) {
    this.productId = product_id;
    this.sizeId = size_id;
    this.dataForm.price.setValue(price);
    this.dataForm.quantity.setValue(quantity);

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', windowClass: "modal-edit-existance" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  onSubmit() {
    let data;
    this.submitted = true;

    if (this.editForm.invalid) {
      this.notifierService.notify('Error', "Formulario Invalido");
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    data = {      
      productId: this.productId,
      sizeId: this.sizeId,
      price: this.dataForm.price.value,
      quantity: this.dataForm.quantity.value
    }

    this.existanceService.edit(data).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          if (data['status']) {
            this.reloadDt.emit();
            this.notifierService.notify('success', data['msg']);
          } else {   
            this.notifierService.notify('error', data['msg']);
          }
        } else {
          console.log('error', 'Error al modificar.');

        }
        this.submitted = false;
      },
      error => {
        if (error.status === 401) {
          console.log(error);
          this.router.navigate(['/']);
        }
        this.loading = false;
        console.log('error', error);        
      }
    );
  }

}
