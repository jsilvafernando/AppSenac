import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  items: Observable<any>

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    this.items = this.service.getAll();
  }

  editItem(item: any){
    this.router.navigate(['users/edit/', item.key]);
  }

  removeItem(item: any){
    this.service.remove(item.key);
  }

}
