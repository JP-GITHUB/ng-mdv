import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import * as _ from 'lodash';

import { ShoppingcartService } from 'src/app/_services/shoppingcart.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.css']
})
export class ModalCartComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  firstImage: String;

  closeResult: string;
  private productSizes: any;

  @ViewChild('content') content;

  private productId: String;
  private productGenderId: Number;
  private productName: String;
  private productDesc: String;
  private productGender: String;

  /** Control Access */
  private selectedSize: Number;
  private textCurrentSize: String;
  private quantityProdSelected: Number;
  private priceModal: Number;
  private txtQuantity: Number;

  constructor(
    private modalService: NgbModal,
    private shoppingcService: ShoppingcartService,
    private dataService: DataService,
    private notifierService: NotifierService,
  ) { }

  ngOnInit() {

    this.galleryOptions = [
      {
        width: '100%',
        height: '100%',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,

      },
    ];
  }

  open(product) {
    this.productId = product.id;
    this.productName = product.name;
    this.productDesc = product.description;
    this.productGenderId = product.Gender.id;
    this.productGender = product.Gender.description;

    this.productSizes = product.ProductSizes;

    this.galleryImages = [];

    if (product.ProductImages.length > 0) {
      product.ProductImages.forEach(element => {
        this.galleryImages.push({
          small: this.dataService.getUrl() + element.location,
          medium: this.dataService.getUrl() + element.location,
          big: this.dataService.getUrl() + element.location
        });
      });
    } else {
      this.galleryImages.push({
        small: '/assets/images/sin-imagen-medium.gif',
        medium: '/assets/images/sin-imagen-medium.gif',
        big: '/assets/images/sin-imagen-medium.gif'
      });
    }

    this.firstImage = String(this.galleryImages[0].medium);

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', windowClass: "modal-cart" }).result.then((result) => {
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

  private getPrice(sizeId) {
    this.selectedSize = Number(sizeId);

    this.productSizes.forEach(element => {
      if (Number(element.Size.id) === this.selectedSize) {
        this.priceModal = element.price;
        this.quantityProdSelected = element.quantity;
        this.textCurrentSize = element.Size.description;
      }
    });
  }

  async saveCart() {
    await this.shoppingcService.saveProductLocalStorage({
      productId: this.productId,
      productName: this.productName,
      sizeId: this.selectedSize,
      textSize: this.textCurrentSize,
      genderText: this.productGender,
      quantity: this.txtQuantity,
      price: this.priceModal,
      image: this.firstImage
    });

    this.notifierService.notify('success', 'Producto agregado al carrito correctamente.');
  }
}
