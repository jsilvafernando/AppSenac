import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(private service: AccountService, private router: Router) { }

  ngOnInit() {
  }

  signOut(){
    this.service.signOut();
    this.router.navigate(['signin'])
  }
}
