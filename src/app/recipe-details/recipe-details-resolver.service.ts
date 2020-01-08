import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../core/recipe.service';
import { NotificatorService } from '../core/notificator.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeDetailsResolverService implements Resolve<{ recipe: Recipe }> {

    constructor(
        private readonly recipeService: RecipeService,
        private readonly notificator: NotificatorService,
    ) { }

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ) {
        const id: string = route.params.id;
        return this.recipeService.getRecipe(id)
            .pipe(catchError(
                res => {
                    this.notificator.error(res.error.error);
                    return of(null);
                }
            ));
    }
}
