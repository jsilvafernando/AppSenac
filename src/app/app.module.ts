import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { AccountService } from './account/shared/account.service';

import { SigninComponent } from './account/signin/signin.component';
import { SignupComponent } from './account/signup/signup.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserService } from './user/shared/user.service';
import { ZoneEditComponent } from './zone/zone-edit/zone-edit.component';
import { ZoneListComponent } from './zone/zone-list/zone-list.component';
import { ZoneService } from './zone/shared/zone.service';
import { CourseEditComponent } from './course/course-edit/course-edit.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseService } from './course/shared/course.service';
import { ClassesEditComponent } from './classes/classes-edit/classes-edit.component';
import { ClassesListComponent } from './classes/classes-list/classes-list.component';
import { ClassesService } from './classes/shared/classes.service';
import { NoticesEditComponent } from './notices/notices-edit/notices-edit.component';
import { NoticesListComponent } from './notices/notices-list/notices-list.component';
import { NoticesService } from './notices/shared/notices.service';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    SigninComponent,
    SignupComponent,
    UserEditComponent,
    UserListComponent,
    ZoneEditComponent,
    ZoneListComponent,
    CourseEditComponent,
    CourseListComponent,
    ClassesEditComponent,
    ClassesListComponent,
    NoticesEditComponent,
    NoticesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ToasterModule
  ],
  providers: [
    FormBuilder,
    ToasterModule,
    AccountService,
    UserService,
    ZoneService,
    CourseService,
    ClassesService,
    NoticesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
