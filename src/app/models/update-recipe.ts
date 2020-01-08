import { Nutrition } from './nutrition';
import { Measure } from './measure';
import { SubRecCreate } from './subrec-create';
import { IngrCreate } from './ingr-create';
import { IngrUpdate } from './ingr-update';
import { SubrecUpdate } from './subrec-update';

export interface UpdateRecipe {

    id: string;

    title: string;

    imageURL ?: string;

    notes ?: string;

    category: string;

    newSubrecipes ?: SubRecCreate[];

    newIngredients ?: IngrCreate[];

    updateIngredients?: IngrUpdate[];

    updateSubrecipes?: SubrecUpdate[];
}
