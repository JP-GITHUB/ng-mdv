import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../_services/user.service';

import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  private readonly notifier: NotifierService;
  registryForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;
  validRut = false;

  constructor(
    private userService: UserService,
    notifierService: NotifierService,
    
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.registryForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      'lastname': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      'rut': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(13),
      ]),
      'mail': new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(100),
      ]),
      'telephone': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      'repassword': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
    });
  }

  get f() { return this.registryForm.controls;}

  checkRut(rut) {

    var valor = rut.value.replace('.','');
    valor = valor.replace('-','');
    
    let cuerpo = valor.slice(0,-1);
    let dv = valor.slice(-1).toUpperCase();
    
    rut.value = cuerpo + '-'+ dv
    
    if(cuerpo.length < 7) { return false;}
    
    let suma = 0;
    let multiplo = 2;
    
    for(let i=1;i<=cuerpo.length;i++) {    
        let index = multiplo * valor.charAt(cuerpo.length - i);        
        suma = suma + index;
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }  
    }
    
    let dvEsperado = 11 - (suma % 11);
    
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    if(dvEsperado != dv) { return false; }
    
    return true;
}
  
  onSubmit() {
    let data;
    this.submitted = true;
    if (this.registryForm.invalid) {      
      this.notifier.notify('error', 'Uno o algunos de los campos ingresados no son correctos');
      console.log(this.registryForm);
      console.log("Invalid form");
      return;
    }

    if(!this.checkRut(this.f.rut)){
      this.validRut = true;
      this.f.rut.setErrors({"invalidRut": true})
      this.notifier.notify('error', 'El rut ingresado no es válido');
      return;
    }

    if(this.f.password != this.f.repassword){
      this.f.repassword.setErrors({"match": true})
      this.notifier.notify('error', 'Las Password ingresadas no coinciden.');
      return;
    }

    

    this.loading = true;

    data = {
      name: this.f.name.value,
      lastname: this.f.lastname.value,
      rut: this.f.rut.value,
      mail: this.f.mail.value,
      telephone: this.f.telephone.value,
      password: this.f.password.value,
      repassword: this.f.repassword.value
    }

    this.userService.registry(data).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          this.notifier.notify(data['status'] ? 'success' : 'error', data['msg']);
          this.registryForm.reset();
        } else {
          this.notifier.notify('error', 'Error al registrar.');
        }
        this.submitted = false;
      },
      error => {
        this.loading = false;
        this.notifier.notify('error', 'Error al registrar.');
      }
    )
  }
}
