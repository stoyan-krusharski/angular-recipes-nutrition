import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from '../recipes/recipes-routing.module';

import { RecipeDetailsComponent } from './recipe-details.component';
import { RecipeDetailsResolverService } from './recipe-details-resolver.service';

@NgModule({
  providers: [RecipeDetailsResolverService],
  declarations: [RecipeDetailsComponent],
  imports: [SharedModule, ReactiveFormsModule, RecipesRoutingModule],
})
export class RecipeDetailsModule { }
