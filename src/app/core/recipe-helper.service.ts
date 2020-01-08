import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Recipe } from '../models/recipe';

@Injectable()
export class RecipeHelperService {

    private readonly selectedProductEmitterSubject: BehaviorSubject<Product | null> = new BehaviorSubject(null);
    private readonly selectedSubrecipeEmitterSubject: BehaviorSubject<Recipe | null> = new BehaviorSubject(null);
    private readonly recipeToUpdateEmitterSubject: BehaviorSubject<Recipe | null> = new BehaviorSubject(null);
    private readonly formEmitterSubject: BehaviorSubject<any | null> = new BehaviorSubject(null);

    constructor() { }

    emitProduct(input: Product) {
        this.selectedProductEmitterSubject.next(input);
    }
    emitSubrecipe(input: Recipe) {
      this.selectedSubrecipeEmitterSubject.next(input);
    }
    emitRecipeToUpdate(input: Recipe) {
      this.recipeToUpdateEmitterSubject.next(input);
    }
    emitForm(input: any) {
      this.formEmitterSubject.next(input);
    }
    public get prodSelected$(): Observable<Product | null> {
      return this.selectedProductEmitterSubject.asObservable();
    }
    public get subrecSelected$(): Observable<Recipe | null> {
      return this.selectedSubrecipeEmitterSubject.asObservable();
    }
    public get recipeToUpdate$(): Observable<Recipe | null> {
      return this.recipeToUpdateEmitterSubject.asObservable();
    }
    public get formToCheck$(): Observable<any | null> {
      return this.formEmitterSubject.asObservable();
    }
}
