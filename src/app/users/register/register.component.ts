import { UserRegister } from './../../models/user-register';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { NotificatorService } from 'src/app/core/notificator.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['', [Validators.required, Validators.pattern(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/
      )
]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }
  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  public register() {
    const user: UserRegister = this.registerForm.value;

    this.authService.register(user).subscribe(
      result => {
        const loginUser = { username: user.username, password: user.password };
        this.authService.login(loginUser).subscribe(
          response => {
            this.notificator.success(`Welcome, ${response.username}!`);
            this.router.navigate(['/recipes']);
          },
          error => this.notificator.error(error.message),
        );
      },
      error => this.notificator.error(error.message),
    );
  }
}
