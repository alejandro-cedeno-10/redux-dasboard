import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre!: string;
  subscription: Subscription = new Subscription();

  constructor(private _store: Store<AppState>) { }
 

  ngOnInit(): void {
  this.subscription =  this._store.select('auth')
  .pipe( filter(
    auth => auth.user != null
  ))
  .subscribe(
      auth => {
        this.nombre = auth.user.name;
      }
    )
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe()
  }

}
