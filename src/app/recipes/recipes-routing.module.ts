import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { AuthGuard } from '../guards/auth.guard';
import { RecipesResolverService } from './recipes-resolvers.service';
import { RecipeDetailsResolverService } from '../recipe-details/recipe-details-resolver.service';


const routes: Routes = [
    { path: '', component: RecipesComponent, pathMatch: 'full', canActivate: [AuthGuard], resolve: [RecipesResolverService] },
    { path: ':id', component: RecipeDetailsComponent, canActivate: [AuthGuard], resolve: [RecipeDetailsResolverService]},
    { path: ':id/edit', component: NewRecipeComponent, canActivate: [AuthGuard], },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }
