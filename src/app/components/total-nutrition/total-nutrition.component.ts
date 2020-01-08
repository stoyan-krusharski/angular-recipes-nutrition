import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { Nutrition } from '../../models/nutrition';

@Component({
  selector: 'app-total-nutrition',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './total-nutrition.component.html',
  styleUrls: ['./total-nutrition.component.scss']
})
export class TotalNutritionComponent {

  @Input() recipeToUpdate: Recipe | null = null;
  @Input() totalNutrition: Nutrition;
  @Input() totalWeight: number;
  nutritionDisplayed: Nutrition;

  constructor() { }
}
