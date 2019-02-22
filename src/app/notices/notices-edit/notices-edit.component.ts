import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticesService } from '../shared/notices.service';
import { ZoneService } from './../../zone/shared/zone.service';
import { CourseService } from '../../course/shared/course.service';
import { ClassesService } from './../../classes/shared/classes.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-notices-edit',
  templateUrl: './notices-edit.component.html',
  styleUrls: ['./notices-edit.component.scss']
})
export class NoticesEditComponent implements OnInit {
  title: string;
  form: FormGroup;
  zones: Observable<any>;
  courses: Observable<any>;
  classes: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toasterService: ToasterService,
    private service: NoticesService,
    private zoneService: ZoneService,
    private courseService: CourseService,
    private classeService: ClassesService) { }

    ngOnInit() {
      this.setupPageTitle();
      this.createForm();
      this.loadZones();
      this.loadCourses();
      this.loadClasses();

      this.route.params.subscribe((value: any) => {
        if (value.key) {
          const subscribe = this.service.get(value.key).subscribe( changes =>{
            subscribe.unsubscribe();

            const item = changes.payload.val();
            this.form.controls['key'].setValue(changes.key);
            this.form.controls['titlenotice'].setValue(item.titlenotice);
            this.form.controls['description'].setValue(item.description);
            this.form.controls['datanotice'].setValue(item.datanotice);
            this.form.controls['zonekey'].setValue(item.zonekey);
            this.form.controls['zonenotice'].setValue(item.zonenotice);
            this.form.controls['coursekey'].setValue(item.coursekey);
            this.form.controls['coursenotice'].setValue(item.coursenotice);
            this.form.controls['classekey'].setValue(item.classekey);
            this.form.controls['classenotice'].setValue(item.classenotice);
          })
        }
      });
    }

    private loadZones(){
      this.zones = this.zoneService.getAll();
    }

    setZoneSelected(itemZone:any){
      if (itemZone){
        this.form.controls['zonenotice'].setValue(itemZone[0].text);
      }
      this.courses = this.courseService.getAllCoursesZones(itemZone[0].value);
    }

    private loadCourses(){
      this.courses = this.courseService.getAll();
    }

    setCourseSelected(itemCourse:any){
      if (itemCourse){
        this.form.controls['coursenotice'].setValue(itemCourse[0].text)
      }
      this.classes = this.classeService.getAllClassesCourses(itemCourse[0].value);
    }

    private loadClasses(){
      this.classes = this.classeService.getAll();
    }

    setClasseSelected(itemClasse:any){
      if (itemClasse){
        this.form.controls['classenotice'].setValue(itemClasse[0].text);
      }
    }

    private setupPageTitle(){
      this.route.data.subscribe((value: any) => {
        this.title = value.title;
      })
    }

    private createForm(){
     this.form = this.formBuilder.group({
      //  key: [''],
       titlenotice: ['', Validators.required],
       description: ['', Validators.required],
       datanotice: ['', Validators.required],
       zone:  [''],
       zonenotice: [''],
       course: [''],
       coursenotice: [''],
       classe: [''],
       classenotice: [''],

     });
    }

    onSubmit() {
      if (this.form.valid){
        this.service.save(this.form.value);
        this.toasterService.pop('success', 'Sucesso', 'Aviso salvo com sucesso.');
        this.router.navigate(['/notices']);
      }
    }
}
