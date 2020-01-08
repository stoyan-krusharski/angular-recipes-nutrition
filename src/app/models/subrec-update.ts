import { Nutrition } from './nutrition';
import { Measure } from './measure';

export interface SubrecUpdate {

    id: string;

    quantity?: number;

    unit?: string;

    isDeleted?: boolean;
}
