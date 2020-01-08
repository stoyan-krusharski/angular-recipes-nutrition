import { Nutrition } from './nutrition';
import { Measure } from './measure';

export interface IngrUpdate {

    id: string;

    quantity?: number;

    unit?: string;

    isDeleted?: boolean;
}
