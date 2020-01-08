import { Nutrition } from './nutrition';

export interface Subrecipe {
    recipeId: string;
    quantity: number;
    unit: string;
    originRecipe: string;
    nutrition: Nutrition;
}
