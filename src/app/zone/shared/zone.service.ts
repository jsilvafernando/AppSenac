
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CourseService } from './../../course/shared/course.service';

@Injectable()
export class ZoneService {

  private PATH = 'zones/';

  constructor(private db: AngularFireDatabase, private courseService: CourseService) { }


  getAll(){
    return this.db.list(this.PATH, ref => ref.orderByChild('key'))
      .snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.key, data: m.payload.val() }));
      }));
  }
  get(key: string){
    return this.db.object(this.PATH + key).snapshotChanges();
  }
  save(item: any){
    const zone = { name: item.name };
    if (item.key) {
      this.db.object(this.PATH + item.key).update(zone)
        .then(() => { // atualizando a área e enviando para atualizar os cursos
          this.courseService.updateZones(item.key, item.name);
        });
    } else { // incluindo
      this.db.list(this.PATH).push(zone);
    }
  }
  remove(key: string){
    this.db.list(this.PATH).remove(key);
  }

}
