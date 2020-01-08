import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodGroup } from '../models/foodgroup';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FoodGroupService {

    public constructor(private readonly http: HttpClient) { }

    public getFoodGroups(): Observable<FoodGroup[]> {
        return this.http.get<FoodGroup[]>(`http://localhost:3000/api/foodgroups`);
    }

}
