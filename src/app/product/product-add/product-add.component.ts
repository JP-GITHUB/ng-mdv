import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from 'src/app/_services/product.service';

import { SchoolService } from 'src/app/_services/school.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  closeResult: string;
  addForm: FormGroup;
  loading = false; //Utilizar para deshabilitar el boton de guardar, antySpam best choice award
  submitted = false;
  returnUrl: String;
  private schools: any;
  private genders: any;

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private schoolService: SchoolService,
    private notifierService: NotifierService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      school: ['', Validators.required],
      gender: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  open(content) {
    this.schoolService.getSchools().subscribe(resp => {
      this.schools = resp['obj'];
    });
    this.productService.getGender().subscribe(resp => {
      this.genders = resp['obj'];
    });
    this.f.gender.setValue(0);
    this.f.school.setValue(0);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "modal-add-user" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  get f() { return this.addForm.controls; }

  /** Imagenes provienen desde el evento click */
  onSubmit(productImages) {
    let data;
    this.submitted = true;

    if (this.addForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    data = {
      name: this.f.name.value,
      description: this.f.description.value,
      school: this.f.school.value,
      gender: this.f.gender.value
    }

    const uploadData = new FormData();
    Array.prototype.forEach.call(productImages.files, function (file) {
      uploadData.append('images', file);
    });

    uploadData.append('data', JSON.stringify(data));

    this.productService.add(uploadData).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          if (data['status']) {
            this.notifierService.notify('success', data['msg']);
            this.reloadDt.emit();
            this.addForm.reset();
          } else {
            this.notifierService.notify('error', data['msg']);
          }
        } else {
          console.log('error', 'Error al registrar.');
        }
        this.submitted = false;
      },
      error => {
        if (error.status === 401) {
          console.log(error);
          this.router.navigate(['/']);
        }

        this.loading = false;
        console.log('error', 'Error al registrar.');
      }
    )
  }

}
