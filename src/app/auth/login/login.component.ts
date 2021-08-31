import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  subscription! : Subscription;

  constructor(public _authService: AuthService,
    public store: Store<AppState>) {
 
   }

  ngOnInit(): void {

    this.subscription =
    this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
     })
  }

  onSubmit(data: any){
    this._authService.login(data.email, data.password)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
