import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from './core/storage.service';
import { AuthService } from './core/auth.service';
import { Subscription } from 'rxjs';
import { NotificatorService } from './core/notificator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public username = '';
  public isLoggedIn = false;
  private isLoggedInSubscription: Subscription;

constructor(private readonly authService: AuthService,
            private readonly notificator: NotificatorService,
            private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      username => {
        if (username === null) {
          this.username = '';
          this.isLoggedIn = false;
        } else {
          this.username = username;
          this.isLoggedIn = true;
        }
      }
    );
  }

  public ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  public logout(): void {
    this.authService
      .logout()
      .subscribe(
        () => {
          this.notificator.success('Successful logout!'),
            this.router.navigate(['/home']);
        },
        () => this.notificator.error('Logout failed!')
      );
  }
}
