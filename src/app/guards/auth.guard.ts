import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { NotificatorService } from '../core/notificator.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly notificatorService: NotificatorService,
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isLoggedIn$.pipe(
            map(user => user !== null),
            tap(user => {
                if (!user) {
                    this.notificatorService.error(`You're unauthorized to access this page!`);
                }
            })
        );
    }
}
