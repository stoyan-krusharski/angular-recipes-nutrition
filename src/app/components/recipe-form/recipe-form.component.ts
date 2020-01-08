import { Component, OnInit, Input, EventEmitter, Output, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Product } from '../../models/product';
import { RecipeHelperService } from '../../core/recipe-helper.service';
import { Category } from '../../models/category';
import { Recipe } from '../../models/recipe';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


export function forbiddenSelectValidator(selectOption: string): ValidatorFn {
  return (control: AbstractControl) => {
    const forbidden = control.value === selectOption;
    return forbidden ? { forbiddenSelect: { valid: false, value: control.value } } : null;
  };
}


@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit, OnDestroy {

  createRecipeForm: FormGroup;
  itemsProd: FormArray;
  itemsSubRec: FormArray;
  prevProd: FormArray;
  prevSubr: FormArray;
  productSelected = false;
  subrecipeSelected = false;
  hasIngredients = false;
  hasSubrecipes = false;
  @Input() categories: Category[];
  @Input() recipeToUpdate: Recipe | null;
  @Output() public emitRecipeData = new EventEmitter<any>();
  @Output() public changeIngredientData = new EventEmitter<any>();
  product: Product;
  subrecipe: Recipe;
  subrecMeasures: any;

  private isProdSelectedSubscription: Subscription;
  private isSubRecSelectedSubscription: Subscription;
  private valueChangeSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private readonly selectedIngrEmitter: RecipeHelperService,
              private readonly router: Router, ) { }

  ngOnInit() {

    this.createRecipeForm = this.formBuilder.group({
      titleField: [this.recipeToUpdate ? this.recipeToUpdate.title : '', [Validators.required, Validators.minLength(4)]],
      // tslint:disable-next-line: max-line-length
      categoriesField: [this.recipeToUpdate ? this.recipeToUpdate.category : '', [Validators.required, forbiddenSelectValidator('Select category')]],
      notesField: [this.recipeToUpdate ? this.recipeToUpdate.notes : ''],
      itemsProd: this.formBuilder.array([]),
      itemsSubRec: this.formBuilder.array([]),
      prevProd: this.formBuilder.array([]),
      prevSubr: this.formBuilder.array([])
    });

    this.isProdSelectedSubscription = this.selectedIngrEmitter.prodSelected$.subscribe(event => {
      this.product = event;
      if (event) {
        this.addProdToFormArray(this.product);
      }
    });
    this.isSubRecSelectedSubscription = this.selectedIngrEmitter.subrecSelected$.subscribe(event => {
      this.subrecipe = event;
      if (event) {
        this.addSubrecToFormArray(this.subrecipe);
      }
    });

    if (this.recipeToUpdate) {

      if (this.recipeToUpdate.ingredients.length > 0) {
        this.hasIngredients = true;
        this.recipeToUpdate.ingredients.forEach(ingr => this.addPrevProdToFormArray(ingr));
      }

      if (this.recipeToUpdate.subrecipes.length > 0) {
        this.hasSubrecipes = true;
        this.recipeToUpdate.subrecipes.forEach(sub => this.addPrevSubrToFormArray(sub));
      }

    }
    if (!this.recipeToUpdate) {
      this.createRecipeForm.controls.categoriesField.patchValue('Select category');
    }
    this.selectedIngrEmitter.emitForm(this.createRecipeForm.value);
    this.handleFormChanges();
  }

  handleFormChanges() {
    this.valueChangeSubscription = this.createRecipeForm.valueChanges.subscribe((data) => {
      this.changeIngredientData.emit(data);
      this.selectedIngrEmitter.emitForm(data);
    });
  }
  get itemsProdArr() {
    return this.createRecipeForm.get('itemsProd') as FormArray;
  }
  get itemsSubRecArr() {
    return this.createRecipeForm.get('itemsSubRec') as FormArray;
  }
  get prevProdArr() {
    return this.createRecipeForm.get('prevProd') as FormArray;
  }
  get prevSubrArr() {
    return this.createRecipeForm.get('prevSubr') as FormArray;
  }

  addProdToFormArray(itm): void {
    this.createRecipeForm.setControl('itemsProd', this.setProdItems(itm));
  }
  addSubrecToFormArray(sub): void {
    this.createRecipeForm.setControl('itemsSubrec', this.setSubRecItems(sub));
  }
  addPrevProdToFormArray(prod): void {
    this.createRecipeForm.setControl('prevProd', this.setPrevProd(prod));
  }
  addPrevSubrToFormArray(sub): void {
    this.createRecipeForm.setControl('prevSubr', this.setPrevSubr(sub));
  }

  setPrevProd(ingr): FormArray {
    const listOfMeasures = ingr.measures.map(measure => measure.amount + ` ${measure.measure}`);
    this.prevProdArr.push(this.formBuilder.group({
      itemName: [ingr.product, [Validators.required]],
      measures: [ingr.unit, [Validators.required]],
      list: [listOfMeasures, [Validators.required]],
      amount: [ingr.quantity, [Validators.required, Validators.min(0.1)]],
      id: [ingr.id],
      calcArr: [ingr.measures],
      nutrition: [ingr.nutrition]
    }));
    this.productSelected = true;
    return this.prevProdArr;
  }

  setPrevSubr(sub): FormArray {
    this.prevSubrArr.push(this.formBuilder.group({
      itemName: [sub.originRecipe, [Validators.required]],
      measures: [sub.unit, [Validators.required]],
      amount: [sub.quantity, [Validators.required, Validators.min(0.1)]],
      id: [sub.recipeId],
      nutrition: [sub.nutrition],
      gramsPerMeasure: [sub.gramsPerMeasure]
    }));

    this.subrecipeSelected = true;
    return this.prevSubrArr;
  }

  setProdItems(itm: Product ): FormArray {
    const listOfMeasures = itm.measures.map(measure => measure.amount + ` ${measure.measure}`);
    this.itemsProdArr.push(this.formBuilder.group({
        itemName: [itm.description, [Validators.required]],
        measures: ['1 g', [Validators.required]],
        list: [listOfMeasures, [Validators.required]],
        amount: [0, [Validators.required, Validators.min(0.1)]],
        code: [itm.code],
        calcArr: [itm.measures],
        nutrition: [{...itm.nutrition}]
      }));

    this.productSelected = true;
    return this.itemsProdArr;
  }
  setSubRecItems(sub: Recipe): FormArray {
    const measureSubRec = `${sub.weight} ${sub.unit}`;
    this.itemsSubRecArr.push(this.formBuilder.group({
        itemName: [sub.title],
        measures: [measureSubRec, [Validators.required]],
        amount: [0, [Validators.required, Validators.min(0.1)]],
        id: [sub.id],
        nutrition: [sub.nutrition],
        gramsPerMeasure: [sub.weight]
      }));

    this.subrecipeSelected = true;
    return this.itemsSubRecArr;
  }

  removeProd(index) {
    this.itemsProdArr.removeAt(index);
  }
  removeSubRec(index) {
    this.itemsSubRecArr.removeAt(index);
  }
  removePrevProd(index) {
    this.prevProdArr.removeAt(index);
  }
  removePrevSubr(index) {
    this.prevSubrArr.removeAt(index);
  }

  submitNewRecipe(): void {
    const formValues = this.createRecipeForm.value;
    const saveData = {
      formValues,
      recipeToUpdate: this.recipeToUpdate
    };
    this.emitRecipeData.emit(saveData);

  }
  resetForm(): void {
    this.createRecipeForm.reset();
    this.itemsProdArr.clear();
    this.itemsSubRecArr.clear();
  }
  cancelUpdate(): void {
    this.router.navigate((['/recipes', this.recipeToUpdate.id]));
  }
  ngOnDestroy(): void {
    this.createRecipeForm.reset();
    this.valueChangeSubscription.unsubscribe();
    this.isProdSelectedSubscription.unsubscribe();
    this.isSubRecSelectedSubscription.unsubscribe();
  }
}
