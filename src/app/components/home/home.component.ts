import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public username = '';
  public isLoggedIn = false;
  private isLoggedInSubscription: Subscription;
  constructor(private readonly authService: AuthService) { }

  ngOnInit() {

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

}
