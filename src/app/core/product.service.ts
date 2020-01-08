import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductsData } from '../models/product-data';

@Injectable()
export class ProductService {

    public constructor(private readonly http: HttpClient) { }

    public getAllProducts(searchObj: any): Observable<ProductsData>  {
        let url = `http://localhost:3000/api/products?`;

        if (searchObj.description) {
                url += `description=${searchObj.description}&`;
            }
        if (searchObj.foodGroup) {
                url += `foodGroup=${searchObj.foodGroup}&`;
            }
        return this.http.get<ProductsData>(url);
    }
}
