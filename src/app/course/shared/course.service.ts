
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';


@Injectable()
export class CourseService {
  PATH = 'courses/';

  constructor(private fb:FirebaseApp, private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list(this.PATH, ref => ref.orderByChild('zoneName'))
      .snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.key, data: m.payload.val() }));
      }));
  }

  getAllCourses(){
    return this.db.list(this.PATH, ref => ref.orderByChild('name'))
      .snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.key, data: m.payload.val() }));
      }));
  }

  public getAllCoursesZones(zonenotice: string) {
    return this.db.list(this.PATH, ref => {
      if (zonenotice) {
        return ref.orderByChild('zoneKey').equalTo(zonenotice)
      } else {
        return ref.orderByChild('name')
      }
    }).snapshotChanges().pipe(map(changes => {
      return changes.map(m => ({ key: m.key, ...m.payload.val() }));
    }));
  }


  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges();
  }

  save(item: any){
    const course = {
        name: item.name,
        zoneKey: item.zoneKey,
        zoneName: item.zoneName
    };
    if (item.key) {
      this.db.object(this.PATH + item.key).update(course);
    } else { // incluindo
      this.db.list(this.PATH).push(course);
    }

  }

  remove(key: string){
    this.db.list(this.PATH).remove(key);
  }

  updateZones(zoneKey: string, zoneName: string){
    const subscribe = this.db.list(this.PATH, ref => ref.orderByChild('zoneKey').equalTo(zoneKey))
      .snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.key}));
      }))
      .subscribe(items => { // ler todas as categorias
        subscribe.unsubscribe();

        items.forEach(course => {
          this.db.object(this.PATH + course.key).update({
            zoneKey: zoneKey,
            zoneName: zoneName
          });
        });
      });
      const subscribeu = this.db.list('users/', ref => ref.orderByChild('zonekey').equalTo(zoneKey))
      .snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.key}));
      }))
      .subscribe(items => { // ler todas as categorias
        subscribeu.unsubscribe();

        items.forEach(user => {
          this.db.object('users/' + user.key).update({
            zonekey: zoneKey,
            zoneuser: zoneName
          });
        });
      });

  }
}
