import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userAuthenticated: boolean;

  constructor(private router: Router, private auth:AngularFireAuth) {}

  ngOnInit(){
    this.userAuthenticated = true;
    this.auth.authState.subscribe( user=> {
      if (user){
        this.userAuthenticated = true;
      } else {
        this.userAuthenticated = false;
        this.router.navigate(['signin']);
      }
    })
  }

}
