import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { CourseService } from '../../course/shared/course.service';
import { ClassesService } from './../shared/classes.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})
export class ClassesListComponent implements OnInit {
  items: Observable<any>

  constructor(private router: Router, private classes: ClassesService) { }

  ngOnInit() {
    this.items = this.classes.getAll();
  }

  editItemClasses(item: any){
    this.router.navigate(['classes/edit/', item.key]);
  }

  removeItemClasses(item: any){
    this.classes.remove(item.key);
  }

}
