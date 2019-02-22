import { ToasterService } from 'angular2-toaster';
import { AccountService } from './../shared/account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private toasterService: ToasterService, private service: AccountService) { }

  ngOnInit() {
    this.CreateForm();
  }

  private CreateForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  onSubmit(){
    if (this.form.valid){
      this.service.CreateAccount(this.form.value)
      .then((user:any) =>{
        this.toasterService.pop(
          'success',
          'Sucesso',
          'Conta criada com sucesso. Por favor confirme seu e=mail antes de efetuar o login.'
        );
      })
      .catch(message => {
        this.toasterService.pop('error', 'Erro', message)
      });
    }
  }

}
