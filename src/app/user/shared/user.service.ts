
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {
  private PATH = 'users/';

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    // return this.db.list(this.PATH, ref => ref.orderByChild('name')).valueChanges() - não traz a key do documento
    return this.db.list(this.PATH, ref => ref.orderByChild('zoneuser'))
      .snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.key, data: m.payload.val() }));
      }));
  }

  get(key: string){
    return this.db.object(this.PATH + key).snapshotChanges();
  }

  // save para inclusão e alteração
  save(item: any){
    const user = {
      name: item.name,
      email: item.email,
      verified: item.verified,
      classekey: item.classekey,
      classeuser: item.classeuser
      };
    if (item.key) { // se existe uma key é alteração
      this.db.object(this.PATH + item.key).update(user) //update atualiza as partes
    }
    //else { // se não seria inclusão ..., que neste caso Eu não tenho...
    //  this.db.list(this.PATH).push(user);
    //}
  }
  remove(key: string){
    this.db.list(this.PATH).remove(key);
  }

}
