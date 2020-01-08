import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../core/product.service';
import { ProductsData } from '../models/product-data';
import { Product } from '../models/product';
import { SearchService } from '../core/search.service';
import { CategoriesService } from '../core/categories.service';
import { Category } from '../models/category';
import { IngrCreate } from '../models/ingr-create';
import { CreateRecipe } from '../models/create-recipe';
import { RecipeService } from '../core/recipe.service';
import { NotificatorService } from '../core/notificator.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FoodGroup } from '../models/foodgroup';
import { FoodGroupService } from '../core/foodgroup.service';
import { Recipe } from '../models/recipe';
import { RecipesData } from '../models/recipe-data';
import { SubRecCreate } from '../models/subrec-create';
import { RecipeHelperService } from '../core/recipe-helper.service';
import { IngrUpdate } from '../models/ingr-update';
import { Ingredient } from '../models/ingredient';
import { SubrecUpdate } from '../models/subrec-update';
import { Subrecipe } from '../models/subrecipe';
import { UpdateRecipe } from '../models/update-recipe';
import { Nutrition } from '../models/nutrition';
import { CalculationService } from '../core/calculation.service';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit, OnDestroy {

  public selectProductSelected = true;
  public products: Product[] = [];
  public subrecipes: Recipe[] = [];
  public productsToSelect = false;
  public subrecipesToSelect = false;
  public categories: Category[];
  public defaultSearch = '';
  formFoodGroups: FormGroup;
  foodgroups: FoodGroup[];
  groupsToSelect: FoodGroup[] | Category[];
  recipeToUpdate: Recipe | null = null;
  formData: any;
  defaultNutrition: Nutrition = {
    PROCNT: { description: 'Protein', unit: 'g', value: 0 },
    FAT:
      { description: 'Total lipid (fat)', unit: 'g', value: 0 },
    CHOCDF:
    {
      description: 'Carbohydrate, by difference',
      unit: 'g',
      value: 0
    },
    ENERC_KCAL: { description: 'Energy', unit: 'kcal', value: 0 },
    SUGAR: { description: 'Sugars, total', unit: 'g', value: 0 },
    FIBTG: { description: 'Fiber, total dietary', unit: 'g', value: 0 },
    CA: { description: 'Calcium, Ca', unit: 'mg', value: 0 },
    FE: { description: 'Iron, Fe', unit: 'mg', value: 0 },
    P: { description: 'Phosphorus, P', unit: 'mg', value: 0 },
    K: { description: 'Potassium, K', unit: 'mg', value: 0 },
    NA: { description: 'Sodium, Na', unit: 'mg', value: 0 },
    VITA_IU:
      { description: 'Vitamin A, IU', unit: 'IU', value: 0 },
    TOCPHA:
    {
      description: 'Vitamin E (alpha-tocopherol)',
      unit: 'mg',
      value: 0
    },
    VITD: { description: 'Vitamin D', unit: 'IU', value: 0 },
    VITC:
    {
      description: 'Vitamin C, total ascorbic acid',
      unit: 'mg',
      value: 0
    },
    VITB12: { description: 'Vitamin B-12', unit: 'µg', value: 0 },
    FOLAC: { description: 'Folic acid', unit: 'µg', value: 0 },
    CHOLE: { description: 'Cholesterol', unit: 'mg', value: 0 },
    FATRN:
    {
      description: 'Fatty acids, total trans',
      unit: 'g',
      value: 0
    },
    FASAT:
    {
      description: 'Fatty acids, total saturated',
      unit: 'g',
      value: 0
    },
    FAMS:
    {
      description: 'Fatty acids, total monounsaturated',
      unit: 'g',
      value: 0
    },
    FAPU:
    {
      description: 'Fatty acids, total polyunsaturated',
      unit: 'g',
      value: 0
    }
  };
  totalNutrition: Nutrition = this.defaultNutrition;
  weightOfRecipe = 0;
  currentProduct: Product;
  currentSubrecipe: Recipe;


  private searchSubscription: Subscription;
  private recipeSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private readonly foodgroupService: FoodGroupService,
              private readonly router: Router,
              private readonly productService: ProductService,
              private readonly searchService: SearchService,
              private readonly categoriesService: CategoriesService,
              private readonly recipeService: RecipeService,
              private readonly toastr: NotificatorService,
              private readonly recipeHelperService: RecipeHelperService,
              private readonly calculationService: CalculationService
              ) {

    this.formFoodGroups = this.formBuilder.group({
      groupsToSelect: [''],
      searchField: ['']
    });
  }

  public ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories: Category[]) => {      // get categories to populate the select list
      this.categories = categories;
    });
    this.foodgroupService.getFoodGroups().subscribe((foodgroups: FoodGroup[]) => {      // get foodgroups to populate the select list
      this.foodgroups = foodgroups;
      this.groupsToSelect = foodgroups;
      this.formFoodGroups.controls.groupsToSelect.patchValue('Select foodgroup');
    });
    if (this.recipeToUpdate) {
      this.recipeToUpdate = null;
      this.totalNutrition = this.defaultNutrition;
      this.weightOfRecipe = 0;
    } else {
      // tslint:disable-next-line: max-line-length
      this.recipeSubscription = this.recipeHelperService.recipeToUpdate$.subscribe(event => {     // if component is used to update recipe, then get the recipeToUpdate
        this.recipeToUpdate = event;
        if (this.recipeToUpdate) {
          const nutritionOfRecipe = this.calculationService.calculateNutrition(this.recipeToUpdate.weight, this.recipeToUpdate.nutrition);
          this.totalNutrition = this.calculationService.shortenNutritionValues(nutritionOfRecipe);
          this.weightOfRecipe = this.recipeToUpdate.weight;
        }
      });
    }
    // tslint:disable-next-line: max-line-length
    this.formFoodGroups.valueChanges.pipe(    // subscribe to changes in the formFoodGroups form to enable real-time update in search results
      filter(data => data.groupsToSelect || data.searchField.length > 1),
     // filter(data => (data.groupsToSelect !== 'Select category' || data.groupsToSelect !== 'Select foodgroup')),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(data => {
        this.formSearchObject(data);
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.recipeSubscription) {
    this.recipeSubscription.unsubscribe();
    }
  }
  public toggleSelectProduct() {
    if (!this.selectProductSelected) {
      this.groupsToSelect = this.foodgroups;
      this.formFoodGroups.controls.groupsToSelect.patchValue('Select foodgroup');
      this.formFoodGroups.controls.searchField.setValue('');
      return this.selectProductSelected = true;
    }
    this.groupsToSelect = this.categories;
    this.formFoodGroups.controls.groupsToSelect.patchValue('Select category');
    this.formFoodGroups.controls.searchField.setValue('');
    return this.selectProductSelected = false;
  }

  public searchButtonClick(): void {
    const formValues = this.formFoodGroups.value;
    this.formSearchObject(formValues);
  }

  // tslint:disable-next-line: max-line-length
  public formSearchObject(formValues) {     // forming the searchObject for product/supbrecipe search depending on if categories/foodgroups are selected and if some fields contain empty strings or 'None'
    if (this.selectProductSelected) {
      const searchObject = {
        description: formValues.searchField,
        foodGroup: formValues.groupsToSelect
      };
      if (formValues.groupsToSelect === 'None' || formValues.groupsToSelect === 'Select foodgroup') {
        searchObject.foodGroup = '';
      }

      if (searchObject.foodGroup === '' && searchObject.description === '') {
        this.productsToSelect = false;
        this.products = [];
      } else {
        this.productsToSelect = true;
        this.searchService.emitSearch(searchObject);
        this.loadProducts();
      }
    } else {
      const searchObject = {
        title: formValues.searchField,
        category: formValues.groupsToSelect
      };
      if (formValues.groupsToSelect === 'None' || formValues.groupsToSelect === 'Select category') {
        searchObject.category = '';
      }

      if (searchObject.category === '' && searchObject.title === '') {
        this.subrecipesToSelect = false;
        this.subrecipes = [];
      } else {
        this.subrecipesToSelect = true;
        this.searchService.emitSearch(searchObject);
        this.loadSubrecipes();
      }
    }
  }
  public showProduct(product: Product) {
    setTimeout(() => (this.currentProduct = product), 10);
  }
  public showSubrecipe(subrecipe: Recipe) {
    setTimeout(() => (this.currentSubrecipe = subrecipe), 10);
  }

  public hideProduct() {
    this.currentProduct = undefined;
  }
  public hideSubrecipe() {
    this.currentSubrecipe = undefined;
  }
  public loadSubrecipes() {
    this.searchSubscription = this.searchService.search$.subscribe(
      (searchObj: any) => {
        this.recipeService
          .getAllRecipes(searchObj)
          .subscribe((data: RecipesData) => {
            this.subrecipes = data.recipes;
            if (data.recipes.length === 0) {
              this.subrecipesToSelect = false;
              this.toastr.error('No recipes were found by these search criteria. Please try again!');
            } else {
              this.subrecipesToSelect = true;
            }
          });
      },
      (error) => {
        this.subrecipes = [];
        this.subrecipesToSelect = false;
      }
    );
    this.searchSubscription.unsubscribe();
  }

  public loadProducts() {

    this.searchSubscription = this.searchService.search$.subscribe(
      (searchObj: any) => {
        this.productService
          .getAllProducts(searchObj)
          .subscribe((data: ProductsData) => {
            this.products = data.products;
            if (data.products.length === 0) {
              this.productsToSelect = false;
              this.toastr.error('No products were found by these search criteria. Please try again!');
            } else {
              this.productsToSelect = true;
            }
          });
      },
      (error) => {
        this.products = [];
        this.productsToSelect = false;
      }
    );
    this.searchSubscription.unsubscribe();
  }

  public createRecipe(saveData): any {

    const ingredients: IngrCreate[] = [];
    const subRecipes: SubRecCreate[] = [];
    const updateIngredients: IngrUpdate[] = [];
    const updateSubrecipes: SubrecUpdate[] = [];

    if (saveData.formValues.itemsProd.length > 0) {     // form the 'ingredients' field of the RecipeCreateDto if ingredients are present
      saveData.formValues.itemsProd.forEach((prod) => {
        const newProd: IngrCreate = {
          code: prod.code,
          quantity: prod.amount,
          unit: prod.measures,
        };
        ingredients.push(newProd);
      });
    }

    if (saveData.formValues.itemsSubRec.length > 0) {     // form the 'subRecipes' field of the RecipeCreateDto if subrecipes are present
      saveData.formValues.itemsSubRec.forEach((sub) => {
        const newSubRec: SubRecCreate = {
          recipeId: sub.id,
          quantity: sub.amount,
          unit: sub.measures
        };
        subRecipes.push(newSubRec);
      });
    }
    if (saveData.recipeToUpdate) {
      // tslint:disable-next-line: max-line-length
      if (saveData.recipeToUpdate.ingredients.length > 0) {    // form the 'updateIngredients' field of the RecipeUpdateCreateDto if ingredients to update are present
        const ingredientsInForm = saveData.formValues.prevProd;
        const prevIngredients: Ingredient[] = saveData.recipeToUpdate.ingredients;

        prevIngredients.forEach((prevIngr: Ingredient) => {
          const ingrMatch = ingredientsInForm.find(ingr => {
            return ingr.id === prevIngr.id;
          });

          const updateIngredient: IngrUpdate = { id: prevIngr.id };
          if (!ingrMatch) {
            updateIngredient.isDeleted = true;
          } else {
            if (ingrMatch.amount !== prevIngr.quantity) {
              updateIngredient.quantity = ingrMatch.amount;
            }
            if (ingrMatch.measures !== prevIngr.unit) {
              updateIngredient.unit = ingrMatch.measures;
            }
          }
          if (Object.keys(updateIngredient).length > 1) {
            updateIngredients.push(updateIngredient);
          }
        });
      }

      // tslint:disable-next-line: max-line-length
      if (saveData.recipeToUpdate.subrecipes.length > 0) {    // form the 'updateSubrecipes' field of the RecipeUpdateCreateDto if subrecipes to update are present
        const subrecipesInForm = saveData.formValues.prevSubr;
        const prevSubrecipes: Subrecipe[] = saveData.recipeToUpdate.subrecipes;

        prevSubrecipes.forEach((prevSubr: Subrecipe) => {
          const subrecMatch = subrecipesInForm.find(sub => {
            return sub.id === prevSubr.recipeId;
          });
          const updateSubrecipe: SubrecUpdate = { id: prevSubr.recipeId };
          if (!subrecMatch) {
            updateSubrecipe.isDeleted = true;
          } else {
            if (subrecMatch.amount !== prevSubr.quantity) {
              updateSubrecipe.quantity = subrecMatch.amount;
            }
            if (subrecMatch.measures !== prevSubr.unit) {
              updateSubrecipe.unit = subrecMatch.measures;
            }
          }
          if (Object.keys(updateSubrecipe).length > 1) {
            updateSubrecipes.push(updateSubrecipe);
          }
        });
      }

      const updateRecipeData: UpdateRecipe = {
        id: saveData.recipeToUpdate.id,
        newIngredients: ingredients,
        newSubrecipes: subRecipes,
        updateIngredients,
        updateSubrecipes,
        category: saveData.formValues.categoriesField,
        title: saveData.formValues.titleField,
        notes: saveData.formValues.notesField,
      };

      this.recipeHelperService.emitRecipeToUpdate(null);
      this.recipeHelperService.emitProduct(null);
      this.recipeHelperService.emitSubrecipe(null);
      return this.recipeService.updateRecipe(updateRecipeData, saveData.recipeToUpdate.id).subscribe((res) => {
        this.toastr.success(res.message);
        this.router.navigate([`recipes/${saveData.recipeToUpdate.id}`]);
      });
    }

    const createRecipeData: CreateRecipe = {
      ingredients,
      subRecipes,
      category: saveData.formValues.categoriesField,
      title: saveData.formValues.titleField,
      notes: saveData.formValues.notesField,
    };
    this.recipeHelperService.emitProduct(null);
    this.recipeHelperService.emitSubrecipe(null);
    return this.recipeService.createNewRecipe(createRecipeData).subscribe((res) => {
      this.toastr.success(res.message);
      this.router.navigate([`/recipes/${res.id}`]);
    },
    (error) => {
      this.toastr.error(error.error.message);
    });
  }

  public recalculateNutrients(data) {
    this.formData = data;
    const itemsProd = data.itemsProd.filter(item => item.itemName !== null);
    const itemsSubRec = data.itemsSubRec.filter(item => item.itemName !== null);
    const prevProd = data.prevProd.filter(item => item.itemName !== null);
    const prevSubr = data.prevSubr.filter(item => item.itemName !== null);
    const allProdsArr = [[...itemsProd], [...prevProd]];
    const allSubArr = [[...itemsSubRec], [...prevSubr]];

    let totalWeight = 0;
    const nutritionArr = [];

    allProdsArr.forEach(arr => {
      if (arr.length > 0) {
          arr.forEach((ing) => {
          const calcObj = this.calculationService.calculateHelperProd(ing);
          totalWeight += calcObj.weightInGrams;
          nutritionArr.push(calcObj.totalNutritionValue);
        });
      }
    });
    allSubArr.forEach(arr => {
      if (arr.length > 0) {
          arr.forEach((sub) => {
          const calcObj = this.calculationService.calculateHelperSub(sub);
          totalWeight += calcObj.weightInGrams;
          nutritionArr.push(calcObj.totalNutritionValue);
        });
      }
    });
    const totalNutritionOfRecipe: Nutrition = this.calculationService.sumNutritionValues(nutritionArr);
    const shortValuesNutrition: Nutrition = this.calculationService.shortenNutritionValues(totalNutritionOfRecipe);
    const totalWeightOfRecipe = totalWeight;

    this.totalNutrition = shortValuesNutrition;
    this.weightOfRecipe = totalWeightOfRecipe;
  }
}

