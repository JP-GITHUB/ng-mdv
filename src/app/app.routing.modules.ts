import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { UserComponent } from './user/user.component';
import { CatalogueComponent } from './catalogue/catalogue/catalogue.component';
import { BranchOfficeComponent } from './branch-office/branch-office.component'
import { ShoppingcartComponent } from './catalogue/shoppingcart/shoppingcart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RetirementComponent } from './retirement/retirement.component';

import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistryComponent },
    { path: 'usuario', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'catalogo/sucursal/:id', component: CatalogueComponent },
    { path: 'sucursal', component: BranchOfficeComponent },
    { path: 'carrito', component: ShoppingcartComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'retiro', component: RetirementComponent, canActivate: [AuthGuard] }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }