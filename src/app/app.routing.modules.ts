import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { UserComponent } from './user/user.component';
import { CatalogueComponent } from './catalogue/catalogue/catalogue.component';
import { BranchOfficeComponent } from './branch-office/branch-office.component'

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistryComponent },
    { path: 'usuario', component: UserComponent },
    { path: 'catalogo/sucursal/:id', component: CatalogueComponent },
    { path: 'sucursal', component: BranchOfficeComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }