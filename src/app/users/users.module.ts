import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [SharedModule, UsersRoutingModule]
})
export class UsersModule {}
