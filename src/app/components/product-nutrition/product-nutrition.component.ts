import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../app/models/product';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-product-nutrition',
  templateUrl: './product-nutrition.component.html',
  styleUrls: ['./product-nutrition.component.scss']
})
export class ProductNutritionComponent {

  @Input() public item: Product | Recipe;
  @Output() public hideProduct = new EventEmitter<Product | Recipe>();

  constructor() { }

  public onCloseButtonClick(): void {
    this.hideProduct.emit(this.item);
  }
}
