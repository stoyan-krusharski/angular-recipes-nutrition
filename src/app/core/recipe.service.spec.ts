import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
    const http = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: HttpClient,
                useValue: http,
            },
        ]
    }));

    it('should be created', () => {
        const service: RecipeService = TestBed.get(RecipeService);
        expect(service).toBeTruthy();
    });
    it('createNewRecipe should create new recipe and return correct message and id', () => {
        const testMessage = 'Recipe successfully created';
        const testId = 'testId';
        const testRecipeData = {
            ingredients: [{
                code: 1001,
                quantity: 2,
                unit: '1 g'
            }],
            category: 'Desserts',
            title: 'Test recipe no image',
            notes: 'Notes'
        };
        http.post.and.returnValue(of({ message: testMessage, id: testId }));
        const service: RecipeService = TestBed.get(RecipeService);
        service.createNewRecipe(testRecipeData).subscribe(
            (res) => {
                expect(res).toEqual({ message: testMessage, id: testId });
            }
        );
    });
    it('createNewRecipe should call http.post once', () => {
        const service: RecipeService = TestBed.get(RecipeService);
        http.post.calls.reset();
        const testRecipeData = {
            ingredients: [{
                code: 1001,
                quantity: 2,
                unit: '1 g'
            }],
            category: 'Desserts',
            title: 'Test recipe no image',
            notes: 'Notes'
        };
        service.createNewRecipe(testRecipeData).subscribe(
            () => expect(http.post).toHaveBeenCalledTimes(1)
        );
    });
    it('getAllRecipes should return an observable list of recipes', () => {
        const testRecipes = [{title: 'test1'}, {title: 'test2'}];
        http.get.and.returnValue(of(testRecipes));
        const service: RecipeService = TestBed.get(RecipeService);
        service.getAllRecipes().subscribe(
            recipesData => {
                expect(recipesData[0].title).toEqual('test1');
                expect(recipesData[1].title).toEqual('test2');
            }
        );
    });
    // tslint:disable-next-line: max-line-length
    it('getAllRecipes should return an observable list of recipes with correct properties when a searchObj with both min and max is provided', () => {
        const testRecipes = [{
            title: 'testTitle',
            category: 'testCategory',
            nutrient: 'testNutrient',
        }];
        const testSearchObj = {
            title: 'testTitle',
            category: 'testCategory',
            nutrient: 'testNutrient',
            min: 1,
            max: 3,
            page: 1,
            limit: 3
        };
        http.get.and.returnValue(of(testRecipes));
        const service: RecipeService = TestBed.get(RecipeService);
        service.getAllRecipes(testSearchObj).subscribe(
            recipesData => {
                expect(recipesData[0].title).toEqual('testTitle');
                expect(recipesData[0].category).toEqual('testCategory');
                expect(recipesData[0].nutrient).toEqual('testNutrient');
            }
        );
    });
    // tslint:disable-next-line: max-line-length
    it('getAllRecipes should return an observable list of recipes with correct properties when a searchObj with only min is provided', () => {
        const testRecipes = [{
            title: 'testTitle',
            category: 'testCategory',
            nutrient: 'testNutrient',
        }];
        const testSearchObj = {
            title: 'testTitle',
            category: 'testCategory',
            nutrient: 'testNutrient',
            min: 1,
            page: 1,
            limit: 3
        };
        http.get.and.returnValue(of(testRecipes));
        const service: RecipeService = TestBed.get(RecipeService);
        service.getAllRecipes(testSearchObj).subscribe(
            recipesData => {
                expect(recipesData[0].title).toEqual('testTitle');
                expect(recipesData[0].category).toEqual('testCategory');
                expect(recipesData[0].nutrient).toEqual('testNutrient');
            }
        );
    });
    // tslint:disable-next-line: max-line-length
    it('getAllRecipes should return an observable list of recipes with correct properties when a searchObj with only max is provided', () => {
        const testRecipes = [{
            title: 'testTitle',
            category: 'testCategory',
            nutrient: 'testNutrient',
        }];
        const testSearchObj = {
            title: 'testTitle',
            category: 'testCategory',
            nutrient: 'testNutrient',
            max: 3,
            page: 1,
            limit: 3
        };
        http.get.and.returnValue(of(testRecipes));
        const service: RecipeService = TestBed.get(RecipeService);
        service.getAllRecipes(testSearchObj).subscribe(
            recipesData => {
                expect(recipesData[0].title).toEqual('testTitle');
                expect(recipesData[0].category).toEqual('testCategory');
                expect(recipesData[0].nutrient).toEqual('testNutrient');
            }
        );
    });
    it('getRecipe should return a recipe with correct properties', () => {
        const testRecipe = {
            title: 'testTitle',
            category: 'testCategory',
        };
        const testId = 'testId';
        http.get.and.returnValue(of(testRecipe));
        const service: RecipeService = TestBed.get(RecipeService);
        service.getRecipe(testId).subscribe(
            res => {
                expect(res.title).toEqual('testTitle');
                expect(res.category).toEqual('testCategory');
            }
        );
    });

    it('updateRecipe should return correct message after updating the recipe', () => {
        const testMessage = 'Successful test update';
        http.put.and.returnValue(of({ message: testMessage}));
        const testRecipeData = {
            ingredients: [{
                code: 1001,
                quantity: 2,
                unit: '1 g'
            }],
            category: 'Desserts',
            title: 'Test recipe no image',
            notes: 'Notes'
        };
        const testId = 'testId';
        const service: RecipeService = TestBed.get(RecipeService);

        service.updateRecipe(testRecipeData, testId).subscribe(
            (res) => {
                expect(res.message).toBe(testMessage);
            }
        );
    });
    it('updateRecipe should call http.put once', () => {
        const service: RecipeService = TestBed.get(RecipeService);
        http.put.calls.reset();
        const testRecipeData = {
            ingredients: [{
                code: 1001,
                quantity: 2,
                unit: '1 g'
            }],
            category: 'Desserts',
            title: 'Test recipe no image',
            notes: 'Notes'
        };
        const testId = 'testId';

        service.updateRecipe(testRecipeData, testId).subscribe(
            () => expect(http.put).toHaveBeenCalledTimes(1)
        );
    });
    it('deleteRecipe should return correct message after deleting the recipe', () => {

        http.delete.and.returnValue(of({ message: 'Successful test delete' }));

        const service: RecipeService = TestBed.get(RecipeService);
        const testId = 'testId';

        service.deleteRecipe(testId).subscribe(
            (res) => {
                expect(res.message).toBe('Successful test delete');
            }
        );
    });
    it('deleteRecipe should call http.delete once', () => {
        const service: RecipeService = TestBed.get(RecipeService);
        http.delete.calls.reset();
        const testId = 'testId';

        service.deleteRecipe(testId).subscribe(
            () => expect(http.delete).toHaveBeenCalledTimes(1)
        );
    });
});
