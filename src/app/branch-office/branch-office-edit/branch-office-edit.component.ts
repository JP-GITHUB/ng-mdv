import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { BranchOfficeService } from 'src/app/_services/branch-office.service'

@Component({
  selector: 'app-branch-office-edit',
  templateUrl: './branch-office-edit.component.html',
  styleUrls: ['./branch-office-edit.component.css']
})
export class BranchOfficeEditComponent implements OnInit {
  @ViewChild('content') content;

  private branchOfficeId: Number;
  closeResult: string;

  objMsg = {
    display: false,
    msg: '',
    type: ''
  }

  /** Form */
  editForm: FormGroup;
  loading = false;
  submitted = false;

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private branchOfficeService: BranchOfficeService
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }

  get dataForm() { return this.editForm.controls; }

  open(id, name, location, telephone) {
    this.branchOfficeId = id;
    this.dataForm.name.setValue(name);
    this.dataForm.location.setValue(location);
    this.dataForm.telephone.setValue(telephone);

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', windowClass: "modal-edit-user" }).result.then((result) => {
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
      id: this.branchOfficeId,
      name: this.dataForm.name.value,
      location: this.dataForm.location.value,
      telephone: this.dataForm.telephone.value
    }

    this.modalService.edit(data).subscribe(
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

}
