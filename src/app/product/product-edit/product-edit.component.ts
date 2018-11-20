import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from 'src/app/_services/product.service'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @ViewChild('content') content;

  private productId: Number;
  closeResult: string;

  objMsg = {
    display: false,
    msg: '',
    type: ''
  }

  editForm: FormGroup;
  loading = false;
  submitted = false;

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get dataForm() { return this.editForm.controls; }

  open(id, name, description) {
    this.productId = id;
    this.dataForm.name.setValue(name);
    this.dataForm.description.setValue(description);

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', windowClass: "modal-edit-user" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  onSubmit() {
    let data;
    this.submitted = true;

    console.log(this.dataForm.name);

    if (this.editForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    data = {
      id: this.productId,
      name: this.dataForm.name.value,
      description: this.dataForm.description.value,
    }

    this.productService.edit(data).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          if (data['status']) {
            this.reloadDt.emit();
            this.editForm.reset();

            this.showMsg(data['msg'], 'success');
          } else {
            this.showMsg(data['msg'], 'error');
          }
        } else {
          console.log('error', 'Error al modificar.');
          this.showMsg('Error al modificar.', 'error');
        }
        this.submitted = false;
      },
      error => {
        this.loading = false;
        console.log('error', error);
        this.showMsg('Error al modificar.', 'error');
      }
    );
  }

  showMsg(msg: string, type: string) {
    this.objMsg.display = true;
    this.objMsg.msg = msg;
    this.objMsg.type = type;
    setTimeout(() => {
      this.clearMsg();
    }, 3000);
  }

  clearMsg() {
    this.objMsg.display = false;
    this.objMsg.msg = '';
    this.objMsg.type = '';
  }

}
