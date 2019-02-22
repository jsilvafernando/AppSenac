
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ClassesService {
  PATH = 'classes/';

  constructor(private fb:FirebaseApp, private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list(this.PATH, ref => ref.orderByChild('name'))
      .snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.key, data: m.payload.val() }));
      }));
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges();
  }

  public getAllClassesCourses(coursenotice: string) {
    return this.db.list(this.PATH, ref => {
      if (coursenotice) {
        return ref.orderByChild('courseKey').equalTo(coursenotice)
      } else {
        return ref.orderByChild('name')
      }
    }).snapshotChanges().pipe(map(changes => {
      return changes.map(m => ({ key: m.key, ...m.payload.val() }));
    }));
  }

  save(item: any){
    const classes = {
        name: item.name,
        courseKey: item.courseKey,
        courseName: item.courseName
    };
    if (item.key) {
      this.db.object(this.PATH + item.key).update(classes);
    } else { // incluindo
      this.db.list(this.PATH).push(classes);
    }

  }

  remove(key: string){
    this.db.list(this.PATH).remove(key);
  }

  updateCourses(courseKey: string, courseName: string){
    const subscribe = this.db.list(this.PATH, ref => ref.orderByChild('courseKey').equalTo(courseKey))
      .snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.key}));
      }))
      .subscribe(items => { // ler todas os cursos
        subscribe.unsubscribe();

        items.forEach(classes => {
          this.db.object(this.PATH + classes.key).update({
            courseKey: courseKey,
            courseName: courseName
          });
        })
      });
  }



}
