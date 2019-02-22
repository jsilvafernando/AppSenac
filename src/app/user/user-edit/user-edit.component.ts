import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { ZoneService } from './../../zone/shared/zone.service';
import { ClassesService } from './../../classes/shared/classes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  title: string;
  form: FormGroup;
  classes: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toasterService: ToasterService,
    private service: UserService,
    private serviceClasses: ClassesService
    ) { }

  ngOnInit() {
    this.setupPageTitle();
    this.createForm();
    this.loadClasses();

    this.route.params.subscribe((value: any) => {
      if (value.key) {
        const subscribe = this.service.get(value.key).subscribe( changes => {
          subscribe.unsubscribe();
          const item = changes.payload.val();
          this.form.controls['key'].setValue(changes.key);
          this.form.controls['name'].setValue(item.name);
          this.form.controls['email'].setValue(item.email);
          this.form.controls['zoneuser'].setValue(item.zoneuser);
          this.form.controls['courseuser'].setValue(item.courseuser);
          this.form.controls['classekey'].setValue(item.classekey);
          this.form.controls['classeuser'].setValue(item.classeuser);
          this.form.controls['verified'].setValue(item.verified);
        });
      }
    });

  }

  private setupPageTitle(){
    this.route.data.subscribe((value: any) =>{
      this.title = value.title;
    })
  }

  private createForm(){
   this.form = this.formBuilder.group({
     key: [''],
     name: ['', Validators.required],
     email: ['', Validators.required],
     zoneuser: ['', Validators.required],
     courseuser: ['', Validators.required],
     classekey: ['', Validators.required],
     classeuser: ['', Validators.required],
     verified: ['', Validators.required]

   });
  }

  onSubmit() {
    if (this.form.valid){
      this.service.save(this.form.value);
      this.toasterService.pop('success', 'Sucesso', 'Usuário salvo com sucesso.');
      this.router.navigate(['/users']);
    }
  }

  setClasseSelected(item:any){
    if (item){
      this.form.controls['classeuser'].setValue(item[0].text);
    }
  }

  private loadClasses(){
    this.classes = this.serviceClasses.getAll();
  }

}

