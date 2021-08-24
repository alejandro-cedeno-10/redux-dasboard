import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(public _authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(data: any){
    this._authService.login(data.email, data.password)
  }

}
