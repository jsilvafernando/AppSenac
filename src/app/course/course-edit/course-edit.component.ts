import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { CourseService } from './../shared/course.service';
import { ZoneService } from './../../zone/shared/zone.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  title: string;
  form: FormGroup;
  zones: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToasterService,
    private formBuilder:FormBuilder,
    private service: CourseService,
    private serviceZone: ZoneService
  ) { }

  ngOnInit() {
    this.setupPageTitle();
    this.createForm();
    this.loadZones();

    this.route.params.subscribe((value: any) =>{
      if (value.key){
        const subscribe = this.service.get(value.key).subscribe( changes =>{
          subscribe.unsubscribe();

          const item = changes.payload.val();
          this.form.controls['key'].setValue(changes.key);
          this.form.controls['name'].setValue(item.name);
          this.form.controls['zoneKey'].setValue(item.zoneKey);
          this.form.controls['zoneName'].setValue(item.zoneName);


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
      name: ['', Validators.required],
      zoneKey: ['', Validators.required],
      zoneName: ['']
    });
   }

   private loadZones(){
     this.zones = this.serviceZone.getAll();
   }

   setZoneSelected(item:any){
     if (item){
       this.form.controls['zoneName'].setValue(item[0].text)
     }
   }

   onSubmit() {
    if (this.form.valid){
      this.service.save(this.form.value);
      this.toasterService.pop('success', 'Sucesso', 'Curso salva com sucesso.');
      this.router.navigate(['/courses']);
    }
  }

}
