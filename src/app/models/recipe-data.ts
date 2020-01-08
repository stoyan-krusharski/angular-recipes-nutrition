import { Nutrition } from './nutrition';
import { Measure } from './measure';
import { Product } from './product';
import { Recipe } from './recipe';

export interface RecipesData {

    recipes: Recipe[];

    page: number;

    recipesCount: number;

    totalRecipes: number;

    next: string;

    previous: string;
}
