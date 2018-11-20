import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app.routing.modules';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ParallaxHomeComponent } from './shared/parallax-home/parallax-home.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';

import { UserModule } from './user/user.module';
import { CatalogueModule } from './catalogue/catalogue.module';
import { BranchOfficeModule } from './branch-office/branch-office.module'
import { ShoppingcartComponent } from './catalogue/shoppingcart/shoppingcart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductModule } from './product/product.module';
import { RetirementComponent } from './retirement/retirement.component';
import { ModalPaymentComponent } from './modal-payment/modal-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    NavbarComponent,
    ParallaxHomeComponent,
    HomeComponent,
    LoginComponent,
    RegistryComponent,
    ShoppingcartComponent,
    CheckoutComponent,
    RetirementComponent,
    ModalPaymentComponent
  ],
  imports: [
    AppRoutingModule,
    UserModule,
    ProductModule,
    CatalogueModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BranchOfficeModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
        }
      }
    }),
    ScrollToModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
