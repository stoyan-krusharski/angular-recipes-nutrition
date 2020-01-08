import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesResolverService } from './recipes-resolvers.service';
import { RecipeDetailsResolverService } from '../recipe-details/recipe-details-resolver.service';
import { AppModalDeleteComponent } from '../recipe-details/modal-delete-recipe/modal-component';
import { AppModalDeleteContentComponent } from '../recipe-details/modal-delete-recipe/modal-content/modal-content';

@NgModule({
  providers: [RecipesResolverService],
  declarations: [RecipesComponent, RecipeDetailsComponent, AppModalDeleteComponent, AppModalDeleteContentComponent],
  imports: [SharedModule, ReactiveFormsModule, RecipesRoutingModule],
  entryComponents: [AppModalDeleteComponent, AppModalDeleteContentComponent]
})
export class RecipesModule { }
