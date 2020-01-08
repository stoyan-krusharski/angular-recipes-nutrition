import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NewRecipeRoutingModule } from './new-recipe-routing.module';


@NgModule({
    imports: [SharedModule, ReactiveFormsModule, NewRecipeRoutingModule]
})
export class NewRecipeModule { }
