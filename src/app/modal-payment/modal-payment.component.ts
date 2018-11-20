import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ShoppingcartService } from '../_services/shoppingcart.service';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.css']
})
export class ModalPaymentComponent implements OnInit {
  closeResult: string;

  public externalPayUrl;

  @Input() resumeProduct;
  @Input() totalPrice;
  @Input() firstName;
  @Input() lastName;
  @Input() rut;
  @Input() mail;

  @Output() eventSale = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private scService: ShoppingcartService
  ) { }

  ngOnInit() {

  }

  open(content) {
    this.makeSale();

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "modal-payment" }).result.then((result) => {
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

  makeSale() {
    let formData = {
      firstName: this.firstName,
      lastName: this.lastName,
      rut: this.rut,
      mail: this.mail,
      products: this.resumeProduct,
      totalValue: this.totalPrice
    };

    this.scService.makeSale(formData).subscribe(
      data => {
        console.log(data);
        if (data['status']) {
          this.scService.clearProductLocalStorage();
          this.eventSale.emit(JSON.stringify(data));

          // data -> payment_id
          this.externalPayUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data['transfer_url']);
        }
      }
    );
  }

}
