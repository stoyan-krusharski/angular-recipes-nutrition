import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable()
export class CategoriesService {

    public constructor(private readonly http: HttpClient) { }

    public getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`http://localhost:3000/api/categories`);
    }

}
