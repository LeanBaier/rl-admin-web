import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss',
})
export class LoginViewComponent {
  username = new FormControl('');
  password = new FormControl('');

  constructor(private authService: AuthenticationService) {}
  login() {
    let username = this.username.getRawValue();
    if (!username) {
      username = '';
    }
    let password = this.password.getRawValue();
    if (!password) {
      password = '';
    }
    this.authService.login(username, password);
  }
}
