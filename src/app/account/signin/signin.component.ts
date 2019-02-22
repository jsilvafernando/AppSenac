import { ToasterService } from 'angular2-toaster';
import { AccountService } from './../shared/account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private toasterService: ToasterService, private service: AccountService) { }

  ngOnInit() {
    this.CreateForm();
  }

  private CreateForm(){
    this.form = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  onSubmit(){
    if (this.form.valid){
      this.service.login(this.form.value)
      .then((user:any) =>{
        if(user.emailVerified){
          this.router.navigate(['/']);
        } else {
          this.toasterService.pop(
            'success',
            'Sucesso',
            'Seu e-mail ainda não foi verificado. Por favor acesse seu e-mail e click no link para verificar a conta.'
          );
        }
      })
      .catch(message => {
        this.toasterService.pop('error', 'Erro', message)
      });
    }
  }
}
