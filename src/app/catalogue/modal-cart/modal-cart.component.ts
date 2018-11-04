import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.css']
})
export class ModalCartComponent implements OnInit {
  closeResult: string;

  @ViewChild('content') content;

  private nameProduct: String;
  private descProduct: String;
  private genderProduct: String;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  open(product) {
    this.nameProduct = product.name;
    this.descProduct = product.description;
    this.genderProduct = product.Gender.description;

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', windowClass:"modal-cart" }).result.then((result) => {
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

}
