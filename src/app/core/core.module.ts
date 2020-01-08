import { NotificatorService } from './notificator.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { SearchService } from './search.service';
import { FoodGroupService } from './foodgroup.service';
import { RecipeService } from './recipe.service';
import { ProductService } from './product.service';
import { CategoriesService } from './categories.service';
import { RecipeHelperService } from './recipe-helper.service';
import { CalculationService } from './calculation.service';


@NgModule({
  providers: [
    NotificatorService,
    AuthService,
    StorageService,
    SearchService,
    FoodGroupService,
    RecipeService,
    ProductService,
    CategoriesService,
    RecipeHelperService,
    CalculationService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}
