import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeHelperService } from '../../core/recipe-helper.service';
import { Subscription } from 'rxjs';
import { CalculationService } from '../../core/calculation.service';

@Component({
  selector: 'app-select-recipe',
  templateUrl: './select-recipe.component.html',
  styleUrls: ['./select-recipe.component.scss']
})
export class SelectRecipeComponent implements OnInit, OnDestroy {

  @Input() subrecipes: Recipe[];
  @Input() recipeToUpdate: Recipe | null;
  @Input() subrecipesToSelect = false;
  @Output() public showSubrecipe = new EventEmitter<Recipe>();
  private formSubscription: Subscription;
  formUpToNow: any;

  constructor(private readonly selectedSubrecipeEmitter: RecipeHelperService,
              private readonly calculationService: CalculationService) { }

  ngOnInit() {
    this.formSubscription = this.selectedSubrecipeEmitter.formToCheck$.subscribe(form => {
      this.formUpToNow = form;
    });
  }

  public isSubrecipeUsed(sub): boolean {
    const sameAsUpdateRec = this.checkIfSameRecipe(sub);
    const existsInSubRec = this.formUpToNow.itemsSubRec.find(item => sub.title === item.itemName);
    const existsInPrevSub = this.formUpToNow.prevSubr.find(item => sub.title === item.itemName);
    return (existsInSubRec || existsInPrevSub || sameAsUpdateRec);
  }

  checkIfSameRecipe(sub): boolean {
    let isSubRecSame = false;
    if (this.recipeToUpdate) {
      if (this.recipeToUpdate.title === sub.title) {
        isSubRecSame = true;
      }
    }
    return isSubRecSame;
  }

  onSubrecipeClick(subrecipe: Recipe): void {
    const totalShortNutrition = this.calculationService.shortenNutritionValues(subrecipe.nutrition);
    subrecipe.nutrition = totalShortNutrition;
    this.showSubrecipe.emit(subrecipe);
  }

  useSelectedSubrecipeEmitter(subrecipe: Recipe) {
    this.selectedSubrecipeEmitter.emitSubrecipe(subrecipe);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }
}
