import { Component, OnInit } from '@angular/core';
import { ZoneService } from './../shared/zone.service';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.scss']
})
export class ZoneEditComponent implements OnInit {

  title: string;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toasterService: ToasterService,
    private service: ZoneService) { }

  ngOnInit() {
    this.setupPageTitle();
    this.createForm();

    this.route.params.subscribe((value: any) =>{
      if (value.key){
        const subscribe = this.service.get(value.key).subscribe( changes =>{
          subscribe.unsubscribe();

          const item = changes.payload.val();
          this.form.controls['key'].setValue(changes.key);
          this.form.controls['name'].setValue(item.name);
        })
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
      name: ['', Validators.required]
    });
   }

   onSubmit() {
    if (this.form.valid){
      this.service.save(this.form.value);
      this.toasterService.pop('success', 'Sucesso', 'Área salva com sucesso.');
      this.router.navigate(['/zones']);
    }
  }

}
