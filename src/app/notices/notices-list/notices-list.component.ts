import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NoticesService } from './../shared/notices.service';

@Component({
  selector: 'app-notices-list',
  templateUrl: './notices-list.component.html',
  styleUrls: ['./notices-list.component.scss']
})
export class NoticesListComponent implements OnInit {
  items: Observable<any>

  constructor(private router: Router, private service: NoticesService) { }

  ngOnInit() {
    this.items = this.service.getAll();
  }

  editItem(item: any){
    this.router.navigate(['notices/edit/', item.key]);
  }

  removeItem(item: any){
    this.service.remove(item.key);
  }

}
