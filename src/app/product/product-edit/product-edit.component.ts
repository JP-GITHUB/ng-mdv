import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from 'src/app/_services/product.service';

import { SchoolService } from 'src/app/_services/school.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @ViewChild('content') content;

  private productId: Number;
  closeResult: string;
  private schools: any;
  private genders: any;

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
    private router: Router,
    private productService: ProductService,
    private schoolService: SchoolService
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      school: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  get dataForm() { return this.editForm.controls; }

  open(id, name, description, school_id, gender_id) {
    this.schoolService.getSchools().subscribe(resp => {
      this.schools = resp['obj'];
    });
    this.productService.getGender().subscribe(resp => {
      this.genders = resp['obj'];
    });

    this.dataForm.gender.setValue(gender_id);
    this.dataForm.school.setValue(school_id);
    this.productId = id;
    this.dataForm.name.setValue(name);
    this.dataForm.description.setValue(description);

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', windowClass: "modal-edit-product" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  onSubmit() {
    let data;
    this.submitted = true;

    if (this.editForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    data = {
      id: this.productId,
      name: this.dataForm.name.value,
      description: this.dataForm.description.value,
      school_id: this.dataForm.school.value,
      gender_id: this.dataForm.gender.value
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
        if (error.status === 401) {
          console.log(error);
          this.router.navigate(['/']);
        }

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
