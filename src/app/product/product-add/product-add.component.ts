import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from 'src/app/_services/product.service';

import { SchoolService } from 'src/app/_services/school.service'

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

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private schoolService: SchoolService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      school: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  open(content) {
    this.schoolService.getSchools().subscribe(resp => {
      this.schools = resp['obj'];
      console.log(this.schools);
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass:"modal-add-user" }).result.then((result) => {
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

  onSubmit() {
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
      school: this.f.school.value      
    }

    console.log(data);

    this.productService.add(data).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          if(data['status']){
            console.log(data['status'] ? 'success' : 'error', data['msg']);
            this.reloadDt.emit();
            this.addForm.reset();
          }else{
            
          }
        } else {
          console.log('error', 'Error al registrar.');
        }
        this.submitted = false;
      },
      error => {
        this.loading = false;
        console.log('error', 'Error al registrar.');
      }
    )
  }

}
