import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToasterService } from 'angular2-toaster';
import { CourseService } from './../../course/shared/course.service';
import { ClassesService } from './../shared/classes.service';

@Component({
  selector: 'app-classes-edit',
  templateUrl: './classes-edit.component.html',
  styleUrls: ['./classes-edit.component.scss']
})
export class ClassesEditComponent implements OnInit {

  title: string;
  form: FormGroup;
  courses: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToasterService,
    private formBuilder:FormBuilder,
    private courseService: CourseService,
    private classes: ClassesService
  ) { }

  ngOnInit() {
    this.setupPageTitle();
    this.createForm();
    this.loadCourses();

    this.route.params.subscribe((value: any) =>{
      if (value.key){
        const subscribe = this.classes.get(value.key).subscribe( changes =>{
          subscribe.unsubscribe();

          const item = changes.payload.val();
          this.form.controls['key'].setValue(changes.key);
          this.form.controls['name'].setValue(item.name);
          this.form.controls['courseKey'].setValue(item.courseKey);
          this.form.controls['courseName'].setValue(item.courseName);


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
      courseKey: ['', Validators.required],
      courseName: ['']
    });
   }

   private loadCourses(){
     this.courses = this.courseService.getAllCourses();
   }

   setCourseSelected(item:any){
     if (item){
       this.form.controls['courseName'].setValue(item[0].text)
     }
   }

   onSubmit() {
    if (this.form.valid){
      this.classes.save(this.form.value);
      this.toasterService.pop('success', 'Sucesso', 'Turma salva com sucesso.');
      this.router.navigate(['/classes']);
    }
  }

}
