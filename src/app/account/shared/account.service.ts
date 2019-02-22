import { Injectable } from '@angular/core';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'

@Injectable()
export class AccountService {
  private PATH = 'usuarios/'
  constructor(public auth: AngularFireAuth, private db: AngularFireDatabase) { }

  CreateAccount(user: any){
    return new Promise((resolve, reject) =>{
      this.auth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((firebaseUser: firebase.User) => {
            this.db.object(this.PATH + firebaseUser.uid).set({ emailVerified: false});
            firebaseUser.updateProfile({ displayName: user.name, photoURL: null});
            firebaseUser.sendEmailVerification();
            this.signOut(); // depois de ter criado o usuário deslogar !
            resolve();
        })
        .catch(e =>{
          reject(this.handlerError(e));
        })
    })
  }

  login(user: any){
    return new Promise((resolve, reject) =>{
      this.auth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((firebaseUser: firebase.User) => {
        if(firebaseUser.emailVerified){
          this.db.object(this.PATH + firebaseUser.uid).set({ emailVerified: true});
        } else {
          firebaseUser.sendEmailVerification();
        }

        resolve({ emailVerified: firebaseUser.emailVerified });
      })
      .catch(e =>{
        reject(this.handlerError(e));
      })
    });
  }

  signOut(){
    this.auth.auth.signOut();
  }

  private handlerError(error: any){
    let message = '';
    if (error.code == 'auth/email-already-in-use') {
      message = 'O e-mail informado já está sendo usado.';
    } else if (error.code == 'auth/invalid-email') {
      message = 'O e-mail informado é inválido.';
    } else if (error.code == 'auth/weak-password') {
      message = 'A senha informada é muito fraca.';
    } else if (error.code == 'auth/user-not-found' || error.code == 'auth/wrong-password') {
      message = 'Usuário/senha inválido(s).';
    } else {
      message = 'Ocorreu algum erro, por favor tente novamente.';
    }

    return message;    
  }
}
