import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { NotificatorService } from '../../core/notificator.service';
import { Router } from '@angular/router';
import { UserLogin } from '../../models/user-login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  public ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.pattern(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/
      )
]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  public login() {
    const user: UserLogin = this.loginForm.value;

    this.authService.login(user).subscribe(
      (data) => {
        this.notificator.success(`Successful login, ${data.username}!`);
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.notificator.error(error.error.message);
      }
    );
  }
}
