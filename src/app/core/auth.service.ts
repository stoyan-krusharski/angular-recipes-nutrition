import { UserLogin } from './../models/user-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserRegister } from '../models/user-register';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

  private readonly isLoggedInSubject$ = new BehaviorSubject<string | null>(this.username);

  public constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService
  ) { }

  public get isLoggedIn$(): Observable<string | null> {
    return this.isLoggedInSubject$.asObservable();
  }

  private get username(): string | null {
    const token = this.storage.getItem('token');
    const username = this.storage.getItem('username') || '';
    if (token) {
      return username;
    }
    return null;
  }

  public register(user: UserRegister): Observable<any> {
    return this.http.post('http://localhost:3000/api/register', user);
  }

  public login(user: UserLogin): Observable<any> {
    return this.http.post('http://localhost:3000/api/login', user).pipe(
      tap(data => {
        this.isLoggedInSubject$.next(data.username);
        this.storage.setItem('token', data.token);
        this.storage.setItem('username', data.username);

      })
    );
  }

  public logout(): Observable<any> {
    return this.http.get('http://localhost:3000/api/logout').pipe(
      tap(() => {
        this.storage.removeItem('token');
        this.storage.removeItem('username');
        this.isLoggedInSubject$.next(null);
      })
    );
  }

  public clearLocalStorage(): void {
    this.storage.clear();
    this.isLoggedInSubject$.next(null);
  }
}
