import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/_services/catalogue.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  public schools = [];
  public products = [];

  public activeElementSchool = null;

  constructor(
    private catalogueService: CatalogueService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    let branchoffice_id = 1;
    this.catalogueService.getShoolsByBranchoffice(branchoffice_id).subscribe(
      data => {
        if (data['status']) {
          this.schools = data['obj'];

          if (this.schools.length > 0) {
            this.activeElementSchool = this.schools[0];
            this.productService.getProductBySchool(this.schools[0].id).subscribe(
              data => {
                if (data['status']) {
                  this.products = data['obj'];
                } else {

                }
              }
            );
          }
        } else {

        }
      }
    );
  }

  changeSchool(item) {
    this.activeElementSchool = item;

    this.productService.getProductBySchool(item.id).subscribe(
      data => {
        if (data['status']) {
          this.products = data['obj'];
        } else {

        }
      }
    );
  }

}
