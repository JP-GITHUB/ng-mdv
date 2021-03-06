import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/_services/catalogue.service';
import { ProductService } from 'src/app/_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  public schools = [];
  public products = [];

  public activeElementSchool = null;
  public hostImages: String;

  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogueService: CatalogueService,
    private dataService: DataService,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit() {
    let branchoffice_id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.hostImages = this.dataService.getUrl();
    this.catalogueService.getShoolsByBranchoffice(branchoffice_id).subscribe(
      data => {
        if (data['status']) {
          this.schools = data['obj'];

          if (this.schools.length > 0) {
            this.activeElementSchool = this.schools[0];
            this.productService.getProductBySchool(this.schools[0].id).subscribe(
              data => {
                if (data) {
                  if (data['status']) {
                    this.products = data['obj'];
                  } else {

                  }
                }
              }
            );
          }
        } else {

        }
      }
    );
  }

  backButton(){
    this.location.back();
  }

  changeSchool(item) {
    this.activeElementSchool = item;

    this.productService.getProductBySchool(item.id).subscribe(
      data => {
        if (data) {
          if (data['status']) {
            this.products = data['obj'];
          } else {

          }
        }
      }
    );
  }

}
