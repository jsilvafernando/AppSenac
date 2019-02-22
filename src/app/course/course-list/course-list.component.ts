import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from './../shared/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  items: Observable<any>

  constructor(private router: Router, private service: CourseService) { }

  ngOnInit() {
    this.items = this.service.getAll();
  }

  editItem(item: any){
    this.router.navigate(['courses/edit/', item.key]);
  }

  removeItem(item: any){
    this.service.remove(item.key);
  }

}
