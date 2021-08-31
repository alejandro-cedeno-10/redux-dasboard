import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as fromUIActions from '../shared/ui.actions';
import * as fromAuthActions from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubcription : Subscription = new Subscription();
  private user!: User;

  constructor(
    public _angularFireAuth: AngularFireAuth,
    private router: Router,
    private _angularFirestore: AngularFirestore,
    private _store: Store<AppState>
  ) {}

  initAuthListener() {
    this._angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userSubcription = this._angularFirestore
          .doc(`${user.uid}/usuario`)
          .valueChanges()
          .subscribe((userObject: any) => {
            const newUser = new User(userObject);
            this._store.dispatch(
              fromAuthActions.SET_USER({
                user: newUser,
              })
            );

            this.user = newUser;
          });

      }else{
        this.user = null!;
        this.userSubcription.unsubscribe();
      }

    });
  }

  newUser(nombres: string, email: string, password: string) {
    this._store.dispatch(fromUIActions.ACTIVAR_LOADING());

    this._angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        const user: User = {
          uid: resp.user!.uid,
          name: nombres,
          email: resp.user!.email ? resp.user!.email : 'undefined',
        };

        this._angularFirestore
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
            this._store.dispatch(fromUIActions.DESACTIVAR_LOADING());
          })
          .catch((err) => {
            this.router.navigate(['/register']);
            this._store.dispatch(fromUIActions.DESACTIVAR_LOADING());
          });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error!',
          text: 'Error en firebase',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        this._store.dispatch(fromUIActions.DESACTIVAR_LOADING());
      });
  }

  login(email: string, password: string) {
    this._store.dispatch(fromUIActions.ACTIVAR_LOADING());

    this._angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        this._store.dispatch(fromUIActions.DESACTIVAR_LOADING());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this._store.dispatch(fromUIActions.DESACTIVAR_LOADING());
        Swal.fire({
          title: 'Error!',
          text: 'Email/Password incorrects',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  }

  logout() {
    this._store.dispatch(fromAuthActions.UNSET_USER());
    return this._angularFireAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
    
  }

  isAuth() {
    return this._angularFireAuth.authState.pipe(
      map((user) => {
        /* console.log(user) */
        if (user === null) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }

  getUser(){
    return {...this.user}
  }
}
