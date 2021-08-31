import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  subscription : Subscription= new Subscription();

  constructor(public authService: AuthService,
    public store: Store<AppState>
    ) {}

  ngOnInit() {

    this.subscription =
    this.store.select('ui').subscribe(ui => {
     this.loading = ui.isLoading;
    });
  }

  onSubmit(data: any) {
    this.authService.newUser(data.nombres, data.email, data.password);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
