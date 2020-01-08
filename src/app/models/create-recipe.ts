import { Nutrition } from './nutrition';
import { Measure } from './measure';
import { SubRecCreate } from './subrec-create';
import { IngrCreate } from './ingr-create';

export interface CreateRecipe {

    title: string;

    imgURL ?: string;

    notes ?: string;

    category: string;

    subRecipes ?: SubRecCreate[];

    ingredients ?: IngrCreate[];

}
