import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { RecipeService } from '../core/recipe.service';
import { RecipesData } from '../models/recipe-data';
import { Recipe } from '../models/recipe';
import { RecipeHelperService } from '../core/recipe-helper.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../models/category';
import { CategoriesService } from '../core/categories.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { CalculationService } from '../core/calculation.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})

export class RecipesComponent implements OnInit {

  public recipes: Recipe[] = [];
  public isLoggedIn = false;
  public categoriesToSelect: Category[] = [];
  private isLoggedInSubscription: Subscription;
  public searchRecipeForm: FormGroup;
  public isDisabled = true;
  public nutrListSearch = ['PROCNT', 'FAT', 'CHOCDF', 'ENERC_KCAL'];
  public nutrListDisplay = ['Proteins', 'Fats', 'Carbohydrates', 'Total energy'];
  p = 1;
  total: number;
  paginateObj: any = { limit: 3 };

  constructor(private readonly authService: AuthService,
              private readonly recipeService: RecipeService,
              private readonly recipeHelperService: RecipeHelperService,
              private readonly categoriesService: CategoriesService,
              private formBuilder: FormBuilder,
              private readonly calculationService: CalculationService,
              private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      username => {
        if (username === null) {
          this.isLoggedIn = false;

        } else {
          this.isLoggedIn = true;
        }
      }
    );
    this.buildForm();
    this.setFormValidators();

    this.activatedRoute.data.subscribe((data: RecipesData) => {
      // tslint:disable-next-line: max-line-length
      const recipesTotalShortNutrition = data[0].recipes.map(recipe => {   // get all recipes through the resolver and transfer their nutrition values from nutrition per 100g to nutrition of total weight of recipe
        const totalNutrOfRecipe = this.calculationService.calculateNutrition(recipe.weight, recipe.nutrition);
        const totalShortNutrition = this.calculationService.shortenNutritionValues(totalNutrOfRecipe);
        recipe.nutrition = totalShortNutrition;
        return recipe;
      });
      this.recipes = recipesTotalShortNutrition;
      this.total = data[0].totalRecipes;
      this.p = data[0].page;
    });

    this.categoriesService.getCategories().subscribe((data: Category[]) => {
        this.categoriesToSelect = data;
    });
    this.recipeHelperService.emitProduct(null);
    this.recipeHelperService.emitSubrecipe(null);
    this.recipeHelperService.emitRecipeToUpdate(null);
  }

  getPage(page: number, paginateObj) {
    const searchObj = {
      ...paginateObj,
      page,
    };
    this.recipeService.getAllRecipes(searchObj).subscribe((data: RecipesData) => {
      const recipesTotalShortNutrition = data.recipes.map(recipe => {
        const totalNutrOfRecipe = this.calculationService.calculateNutrition(recipe.weight, recipe.nutrition);
        const totalShortNutrition = this.calculationService.shortenNutritionValues(totalNutrOfRecipe);
        recipe.nutrition = totalShortNutrition;
        return recipe;
      });
      this.recipes = recipesTotalShortNutrition;
      this.total = data.totalRecipes;
      this.p = page;
    });
  }

  buildForm() {
    this.searchRecipeForm = this.formBuilder.group({
      categoriesToSelect: [''],
      searchField: [''],
      nutrientsToSelect: [''],
      minValue: [{ value: '', disabled: true }, [Validators.min(0.1)]],
      maxValue: [{ value: '', disabled: true }, [Validators.min(0.1)]]
    });
  }

  setFormValidators() {
    const minValue = this.searchRecipeForm.get('minValue');
    const maxValue = this.searchRecipeForm.get('maxValue');

    this.searchRecipeForm.get('nutrientsToSelect').valueChanges.pipe(distinctUntilChanged()).subscribe((nutrient) => {

     if (nutrient) {
        minValue.enable();
        maxValue.enable();
      } else {
        minValue.disable();
        maxValue.disable();
        minValue.reset();
        maxValue.reset();
      }
    });
    this.searchRecipeForm.get('minValue').valueChanges.pipe(distinctUntilChanged()).subscribe((min) => {
      if (min) {
        maxValue.setValidators([Validators.min(minValue.value)]);
        maxValue.updateValueAndValidity();
      } else {
        maxValue.setValidators(null);
        maxValue.updateValueAndValidity();
      }
    });
    this.searchRecipeForm.get('maxValue').valueChanges.pipe(distinctUntilChanged()).subscribe((max) => {
      if (max) {
        minValue.setValidators(Validators.max(maxValue.value));
        minValue.updateValueAndValidity();
      } else {
        minValue.setValidators(null);
        minValue.updateValueAndValidity();
      }
    });
  }

  public searchButtonClick() {

    const formValues = this.searchRecipeForm.value;

    this.paginateObj = {
      category: formValues.categoriesToSelect === 'None' ? '' : formValues.categoriesToSelect,
      title: formValues.searchField,
      // tslint:disable-next-line: max-line-length
      nutrient: formValues.nutrientsToSelect === 'None' ? '' : this.nutrListSearch[this.nutrListDisplay.indexOf(formValues.nutrientsToSelect)],
      min: formValues.minValue,
      max: formValues.maxValue,
      page: 1,
      limit: 3
    };

    this.getPage(1, this.paginateObj);
  }
}
