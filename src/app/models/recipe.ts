import { Nutrition } from './nutrition';
import { Ingredient } from './ingredient';
import { Subrecipe } from './subrecipe';

export interface Recipe {
    id: string;
    title: string;
    category: string;
    imgURL: string;
    notes: string;
    weight: number;
    unit: string;
    createdOn: Date;
    ingredients?: Ingredient[];
    subrecipes?: Subrecipe[];
    nutrition: Nutrition;
}
