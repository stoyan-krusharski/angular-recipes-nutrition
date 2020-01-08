import { Nutrition } from './nutrition';
import { Measure } from './measure';

export interface Ingredient {
    id: string;
    quantity: number;
    product: string;
    unit: string;
    nutrition: Nutrition;
    measures: Measure[];
}
