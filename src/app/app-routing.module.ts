import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './account/signin/signin.component';
import { SignupComponent } from './account/signup/signup.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ZoneListComponent } from './zone/zone-list/zone-list.component';
import { ZoneEditComponent } from './zone/zone-edit/zone-edit.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseEditComponent } from './course/course-edit/course-edit.component';
import { ClassesListComponent } from './classes/classes-list/classes-list.component';
import { ClassesEditComponent } from './classes/classes-edit/classes-edit.component';
import { NoticesEditComponent } from './notices/notices-edit/notices-edit.component';
import { NoticesListComponent } from './notices/notices-list/notices-list.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'users', component: UserListComponent},
  { path: 'zones', component: ZoneListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'classes', component: ClassesListComponent },
  { path: 'notices', component: NoticesListComponent },
  {
    path: 'users/edit/:key',
    component: UserEditComponent,
    data: {title: 'Alterando Usuários'}
  },
  {
    path: 'zones/new',
    component: ZoneEditComponent,
    data: { title: 'Nova Área'}
  },
  {
    path: 'zones/edit/:key',
    component: ZoneEditComponent,
    data: {title: 'Alterando Área'}
  },
  {
    path: 'courses/new',
    component: CourseEditComponent,
    data: { title: 'Novo curso'}
  },
  {
    path: 'courses/edit/:key',
    component: CourseEditComponent,
    data: {title: 'Alterando curso'}
  },
  {
    path: 'classes/new',
    component: ClassesEditComponent,
    data: { title: 'Nova turma'}
  },
  {
    path: 'classes/edit/:key',
    component: ClassesEditComponent,
    data: {title: 'Alterando turma'}
  },
  {
    path: 'notices/new',
    component: NoticesEditComponent,
    data: { title: 'Novo aviso'}
  },
  {
    path: 'notices/edit/:key',
    component: NoticesEditComponent,
    data: {title: 'Alterando aviso'}
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
