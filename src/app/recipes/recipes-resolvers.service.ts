import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RecipesData } from '../models/recipe-data';
import { RecipeService } from '../core/recipe.service';
import { NotificatorService } from '../core/notificator.service';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<{ resolvedRecipeResponse: RecipesData }> {

    constructor(
        private readonly recipesService: RecipeService,
        private readonly notificator: NotificatorService,
    ) { }

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ) {
        return this.recipesService.getAllRecipes({
            limit: 3,
            page: 1,
        })
            .pipe(catchError(
                res => {
                    this.notificator.error(res.error.error);
                    return of(null);
                }
            ));
    }
}
