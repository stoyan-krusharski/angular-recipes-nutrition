import { Nutrition } from './nutrition';
import { Measure } from './measure';

export interface Product {

    code: number;

    description: string;

    foodGroup: string;

    measures: Measure[];

    nutrition: Nutrition;
}
