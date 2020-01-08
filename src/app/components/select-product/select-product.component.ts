import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { RecipeHelperService } from '../../core/recipe-helper.service';
import { Subscription } from 'rxjs';
import { CalculationService } from '../../core/calculation.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit, OnDestroy {

  @Input() public productsToSelect = false;
  @Input() products: Product[];
  @Output() public showProduct = new EventEmitter<Product>();
  private formSubscription: Subscription;
  formUpToNow: any;

  constructor(private readonly selectedProductEmitter: RecipeHelperService,
              private readonly calculationService: CalculationService) { }

  public ngOnInit(): void {
    this.formSubscription = this.selectedProductEmitter.formToCheck$.subscribe(form => {
      this.formUpToNow = form;
    });
  }

  public isProductUsed(product: Product): boolean {
    const existsInProd = this.formUpToNow.itemsProd.find(item => product.description === item.itemName);
    const existsInPrevProd = this.formUpToNow.prevProd.find(item => product.description === item.itemName);
    return (existsInProd || existsInPrevProd);
  }

  public onProductClick(product: Product): void {
    const totalShortNutrition = this.calculationService.shortenNutritionValues(product.nutrition);
    product.nutrition = totalShortNutrition;
    this.showProduct.emit(product);
  }

  useSelectedProductEmitter(product: Product) {
    this.selectedProductEmitter.emitProduct(product);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }
}
