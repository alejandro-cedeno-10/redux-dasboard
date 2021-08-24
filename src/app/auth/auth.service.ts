import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _angularFireAuth: AngularFireAuth,
    private router: Router,
    private _angularFirestore : AngularFirestore
  ) {}

  initAuthListener() {
    this._angularFireAuth.authState.subscribe((user) => {
      console.log(user);
    });
  }

  newUser(nombres: string, email: string, password: string) {
    this._angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        const user : User = {
          uid: resp.user!.uid,
          name: nombres,
          email: resp.user!.email ?? 'null' 
        };

        this._angularFirestore.doc(`${ user.uid }/usuario`).set(
          user
        ).then(
          () => {
            this.router.navigate(['/']);
          }
        ).catch(err => {
          this.router.navigate(['/register']);
        })

        
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error!',
          text: 'Email registrado',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  }

  login(email: string, password: string) {
    this._angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: 'Error!',
          text: 'Email/Password incorrects',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  }

  logout() {
    this.router.navigate(['/login']);

    this._angularFireAuth.signOut();
  }

  isAuth() {
    return this._angularFireAuth.authState.pipe(map((user) =>{ 
      if(user == null) {
        this.router.navigate(['/login'])
      }
     return user != null}));
  }
}
