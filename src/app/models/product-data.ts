import { Nutrition } from './nutrition';
import { Measure } from './measure';
import { Product } from './product';

export interface ProductsData {

    products: Product[];

    page: number;

    productsCount: number;

    totalProducts: number;

    next: string;

    previous: string;
}
