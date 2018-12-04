import { Component, ViewChild } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SaleService } from '../_services/sale.service';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent {
  @ViewChild('content') content;
  closeResult: string;
  public clientName: String;
  public clientLastname;
  public sale: any
  public products: any;

  constructor(
    private modalService: NgbModal,
    private saleService: SaleService
  ) { }

  open(clientName: String, clientLastname, sale: any) {
    this.clientName = clientName;
    this.clientLastname = clientLastname;
    this.sale = sale;

    this.products = this.saleService.getSales(this.sale.code);

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', windowClass: "modal-sale-detail" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  cancelSale(saleId) {
    this.saleService.cancelSale(saleId).subscribe(
      data => {

      },
      error => {

      }
    )
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