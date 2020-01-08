import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { ServerErrorInterceptor } from './interceptors/server-error-interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { NbThemeModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    ServerErrorComponent,
    HomeComponent,
   ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    RoundProgressModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:3000/api'],
        blacklistedRoutes: ['localhost:3000/api/login']
      }
    }),
    NbThemeModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
