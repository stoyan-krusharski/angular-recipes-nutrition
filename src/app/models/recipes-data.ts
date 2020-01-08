import { Nutrition } from './nutrition';
import { Ingredient } from './ingredient';
import { Subrecipe } from './subrecipe';
import { Recipe } from './recipe';

export interface RecipeData {
    recipes: Recipe[];
    page: number;
    recipesCount: number;
    totalRecipes: number;
    next: string;
    previous: string;
}
