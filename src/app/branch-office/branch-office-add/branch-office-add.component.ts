import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { BranchOfficeService } from 'src/app/_services/branch-office.service'

@Component({
  selector: 'app-branch-office-add',
  templateUrl: './branch-office-add.component.html',
  styleUrls: ['./branch-office-add.component.css']
})
export class BranchOfficeAddComponent implements OnInit {

  closeResult: string;
  addForm: FormGroup;
  loading = false; //Utilizar para deshabilitar el boton de guardar, antySpam best choice award

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private branchOfficeService: BranchOfficeService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      telephone: ['', Validators.required],
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

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass:"modal-add-branch-office" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  get dataForm() { return this.addForm.controls; }

  onSubmit() {
    let data;

    if (this.addForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    data = {
      name: this.dataForm.name.value,
      location: this.dataForm.location.value,
      telephone: this.dataForm.telephone.value
    }

    this.branchOfficeService.add(data).subscribe(
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
      },
      error => {
        this.loading = false;
        console.log('error', 'Error al registrar.');
      }
    )
  }
}
