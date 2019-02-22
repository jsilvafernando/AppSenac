
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class NoticesService {
  private PATH = 'notices/';

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list(this.PATH, ref => ref.orderByChild('title'))
      .snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.key, data: m.payload.val() }));
      }));
  }
  get(key: string){
    return this.db.object(this.PATH + key).snapshotChanges();
  }

  // save para inclusão e alteração
  save(item: any) {

    const notice = {
      titlenotice: item.titlenotice,
      description: item.description,
      datanotice: item.datanotice,
      zonekey: item.zone,
      zonenotice: item.zonenotice,
      coursekey: item.course,
      coursenotice: item.coursenotice,
      classeky: item.classe,
      classenotice: item.classenotice
    };
      if (item.key) { // se existe uma key é alteração, update atualiza as partes
        this.db.object(this.PATH + item.key).update(notice);
      } else { // se não seria inclusão ...
       this.db.list(this.PATH).push(notice);
      }
  }
  remove(key: string) {
    this.db.list(this.PATH).remove(key);
  }
}
