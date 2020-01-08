import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RecipeService } from '../core/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { Subscription } from 'rxjs';
import { RecipeHelperService } from '../core/recipe-helper.service';
import { Nutrition } from '../models/nutrition';
import { CalculationService } from '../core/calculation.service';


@Component({
  selector: 'app-recipe-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

    public routeParamsSubscription: Subscription;
    public recipeID: string;
    public currentRecipe: Recipe;
    public ingredients: string[] = [];
    public subrecipes: string[] = [];
    public totalNutrition: Nutrition;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly recipeHelperService: RecipeHelperService,
    private readonly recipeService: RecipeService,
    private readonly calculationService: CalculationService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.currentRecipe = data[0];
      const totalNutrOfRecipe = this.calculationService.calculateNutrition(this.currentRecipe.weight, this.currentRecipe.nutrition);
      this.totalNutrition = this.calculationService.shortenNutritionValues(totalNutrOfRecipe);
    });
  }

  public goToPage(recipeID: string) {
    this.recipeHelperService.emitRecipeToUpdate(this.currentRecipe);
    this.router.navigate([`/recipes/${recipeID}/edit`]);
  }

  public deleteRecipe(recipeID: string) {
    this.recipeService.deleteRecipe(recipeID);
  }
}
