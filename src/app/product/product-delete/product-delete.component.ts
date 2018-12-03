import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  @ViewChild('content') content;

  private productId: Number;
  closeResult: string;

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
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

  open(productId) {
    this.productId = productId;

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit() {
    this.productService.delete(this.productId).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          if (data['status']) {
            alert("El producto fue deshabilitado");
            this.modalService.dismissAll();
            this.reloadDt.emit();
          } else {

          }
        } else {
          console.log('error', 'Error al eliminar.');
        }
      },
      error => {
        if (error.status === 401) {
          console.log(error);
          this.router.navigate(['/']);
        }

        console.log('error', 'Error al eliminar.');
      }
    )
  }

}
