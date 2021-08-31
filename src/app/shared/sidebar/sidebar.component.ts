import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgreso } from '../../ingreso-egreso/ingreso-egreso.model';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  nombre!: string;
  subscription: Subscription = new Subscription();


  constructor(
    public ingresoEgresoService: IngresoEgresoService,
    public _auhtService: AuthService, private _store : Store<AppState>) { }

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

  logout(){
    this.ingresoEgresoService.cancelarSubscription()
    this._auhtService.logout();
  }

}
