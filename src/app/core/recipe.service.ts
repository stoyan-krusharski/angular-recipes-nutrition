import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { RecipesData } from '../models/recipe-data';

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class RecipeService {

    public constructor(private readonly http: HttpClient) { }

    public getAllRecipes(searchObj?: any): Observable<RecipesData> {

        let url = `http://localhost:3000/api/recipes?`;
        if (searchObj) {
            if (searchObj.title) {
                url += `title=${searchObj.title}&`;
            }
            if (searchObj.category) {
                url += `category=${searchObj.category}&`;
            }
            if (searchObj.nutrient) {

                if (searchObj.min && searchObj.max) {
                    url += `nutrient=${searchObj.nutrient}&min=${searchObj.min}&max=${searchObj.max}&`;
                } else if (searchObj.min) {
                    url += `nutrient=${searchObj.nutrient}&min=${searchObj.min}&`;
                } else if (searchObj.max) {
                    url += `nutrient=${searchObj.nutrient}&max=${searchObj.max}&`;
                }
            }
            if (searchObj.limit) {
                url += `limit=${searchObj.limit}&`;
            }
            if (searchObj.page) {
                url += `page=${searchObj.page}&`;
            }
        }
        return this.http.get<RecipesData>(url);
    }
    public createNewRecipe(recipeCreateData): Observable<{ message: string, id: string }> {
        return this.http.post<{ message: string, id: string }>(`http://localhost:3000/api/recipes`, recipeCreateData);
    }
    public updateRecipe(recipeUpdateData, recipeId): Observable<{ message: string }> {
        return this.http.put<{ message: string }>(`http://localhost:3000/api/recipes/${recipeId}`, recipeUpdateData);
    }
    public getRecipe(recipeId: string): Observable<Recipe> {
        return this.http.get<Recipe>(`http://localhost:3000/api/recipes/${recipeId}`);
    }
    public deleteRecipe(recipeId: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`http://localhost:3000/api/recipes/${recipeId}`);
    }

}
