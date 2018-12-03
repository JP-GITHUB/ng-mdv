import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ExistanceService } from 'src/app/_services/existance.service';
import { ProductService } from 'src/app/_services/product.service';

import { SchoolService } from 'src/app/_services/school.service';
import { NotifierService } from 'angular-notifier';

import { Router } from '@angular/router';

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
  private products: any;
  private sizes: any;
  private genders: any;

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private existanceService: ExistanceService,
    private schoolService: SchoolService,
    private notifierService: NotifierService,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      school: ['', Validators.required],
      gender: ['', Validators.required],
      size: ['', Validators.required],
      product: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  

  open(content) {
    this.schoolService.getSchools().subscribe(resp => {
      this.schools = resp['obj'];
    });
    this.productService.getGender().subscribe(resp => {
      this.genders = resp['obj'];
    });
    this.existanceService.getSize().subscribe(resp => {
      this.sizes = resp['obj'];
    });
    this.f.gender.setValue(0);
    this.f.school.setValue(0);
    this.f.size.setValue(0);
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

  loadProduct(){
    if(this.f.school.value != 0 && this.f.gender.value != 0){
      this.productService.getProductBySchool(this.f.school.value).subscribe(resp => {
        this.products = resp['obj'].filter(r => r.Gender.id == this.f.gender.value);
      });
    }    
  }

  get f() { return this.addForm.controls; }

  onSubmit() {
    let data;
    this.submitted = true;

    if (this.addForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    data = {
      size: this.f.size.value,
      product: this.f.product.value,
      quantity: this.f.quantity.value,
      price: this.f.price.value
    }

    this.existanceService.add(data).subscribe(
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
          console.log('error', 'Error al registrar existencia.');
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
