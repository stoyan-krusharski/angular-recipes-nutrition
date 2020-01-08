import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { SelectProductComponent } from '../components/select-product/select-product.component';
import { SelectRecipeComponent } from '../components/select-recipe/select-recipe.component';
import { RecipeFormComponent } from '../components/recipe-form/recipe-form.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { TotalNutritionComponent } from '../components/total-nutrition/total-nutrition.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { ProductNutritionComponent } from '../components/product-nutrition/product-nutrition.component';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [NewRecipeComponent, SelectProductComponent, SelectRecipeComponent, RecipeFormComponent, TotalNutritionComponent, ProductNutritionComponent],
  // tslint:disable-next-line: max-line-length
  imports: [CommonModule, RouterModule, NgbModule, HttpClientModule, FormsModule, ReactiveFormsModule, RoundProgressModule, NgxPaginationModule, NbCardModule, NbTabsetModule, ClickOutsideModule],
  exports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RoundProgressModule,
    NewRecipeComponent,
    SelectProductComponent,
    SelectRecipeComponent,
    RecipeFormComponent,
    TotalNutritionComponent,
    NgxPaginationModule,
    NbCardModule,
    NbTabsetModule,
    ProductNutritionComponent,
    ClickOutsideModule
  ]
})
export class SharedModule {}
