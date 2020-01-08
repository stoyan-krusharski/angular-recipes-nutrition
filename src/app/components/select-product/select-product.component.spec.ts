import { SharedModule } from '../../../app/shared/shared.module';
import { TestBed, async } from '@angular/core/testing';
import { RecipeHelperService } from '../../core/recipe-helper.service';
import { CalculationService } from '../../core/calculation.service';
import { SelectProductComponent } from './select-product.component';
import { of } from 'rxjs';


describe('SelectProductComponent', () => {
    let fixture;
    const recipeHelper = jasmine.createSpyObj('RecipeHelperService', ['formToCheck$', 'emitProduct', 'prodSelected$']);
    const calculationService = jasmine.createSpyObj('CalculationService', ['shortenNutritionValues', 'emitProduct']);

    const testForm = {
        prevProd: [{itemName: 'testItem1'}],
        itemsProd: [{itemName: 'testItem2'}]
    };
    const testProduct = {
        code: 1001,
        description: 'testItem2',
        foodGroup: 'Dairy and Egg Products',
        measures: [
            {
                measure: 'g',
                amount: 1,
                gramsPerMeasure: 1
            },
        ],
        nutrition: {
            PROCNT: {
                description: 'Protein',
                unit: 'g',
                value: 0.90
            },
            FAT: {
                description: 'Total lipid (fat)',
                unit: 'g',
                value: 81.11
            },
            CHOCDF: {
                description: 'Carbohydrate, by difference',
                unit: 'g',
                value: 0.06
            },
            ENERC_KCAL: {
                description: 'Energy',
                unit: 'kcal',
                value: 717
            },
            SUGAR: {
                description: 'Sugars, total',
                unit: 'g',
                value: 0.06
            },
            FIBTG: {
                description: 'Fiber, total dietary',
                unit: 'g',
                value: 0
            },
            CA: {
                description: 'Calcium, Ca',
                unit: 'mg',
                value: 24
            },
            FE: {
                description: 'Iron, Fe',
                unit: 'mg',
                value: 0.02
            },
            P: {
                description: 'Phosphorus, P',
                unit: 'mg',
                value: 24
            },
            K: {
                description: 'Potassium, K',
                unit: 'mg',
                value: 24
            },
            NA: {
                description: 'Sodium, Na',
                unit: 'mg',
                value: 643
            },
            VITA_IU: {
                description: 'Vitamin A, IU',
                unit: 'IU',
                value: 2499
            },
            TOCPHA: {
                description: 'Vitamin E (alpha-tocopherol)',
                unit: 'mg',
                value: 2.32
            },
            VITD: {
                description: 'Vitamin D',
                unit: 'IU',
                value: 0
            },
            VITC: {
                description: 'Vitamin C, total ascorbic acid',
                unit: 'mg',
                value: 0
            },
            VITB12: {
                description: 'Vitamin B-12',
                unit: 'µg',
                value: 0.17
            },
            FOLAC: {
                description: 'Folic acid',
                unit: 'µg',
                value: 0
            },
            CHOLE: {
                description: 'Cholesterol',
                unit: 'mg',
                value: 0
            },
            FATRN: {
                description: 'Fatty acids, total trans',
                unit: 'g',
                value: 3.278
            },
            FASAT: {
                description: 'Fatty acids, total saturated',
                unit: 'g',
                value: 51.368
            },
            FAMS: {
                description: 'Fatty acids, total monounsaturated',
                unit: 'g',
                value: 21.021
            },
            FAPU: {
                description: 'Fatty acids, total polyunsaturated',
                unit: 'g',
                value: 3.043
            }
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                SharedModule,
            ],
            providers: [
                {
                    provide: RecipeHelperService,
                    useValue: recipeHelper,
                },
                {
                    provide: CalculationService,
                    useValue: calculationService,
                },
            ]
        });
    }));

    afterEach(() => {
        if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
            (fixture.nativeElement as HTMLElement).remove();
        }
    });

    it('should create the SelectProductComponent', () => {
        fixture = TestBed.createComponent(SelectProductComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    it('should initialize with the correct form data', async () => {
        recipeHelper.formToCheck$ = of(testForm);
        fixture = TestBed.createComponent(SelectProductComponent);
        const app = fixture.debugElement.componentInstance;

        await fixture.detectChanges();
        expect(app.formUpToNow).toEqual(testForm);
    });
    // tslint:disable-next-line: max-line-length
    it('isProductUsed should return true when a product with same description as one of items itemNames in formUpToNow is provided', async () => {
        fixture = TestBed.createComponent(SelectProductComponent);
        const app = fixture.debugElement.componentInstance;

        await fixture.detectChanges();
        const result = app.isProductUsed(testProduct);

        expect(result).toBeTruthy();
    });
    // tslint:disable-next-line: max-line-length
    it('isProductUsed should return false when item with itemName in formUpToNow does not match the provided products description', async () => {
        const testFormFalsyTest = {
            prevProd: [{ itemName: 'testItem1' }],
            itemsProd: [{ itemName: 'testItem3' }]
        };
        recipeHelper.formToCheck$ = of(testFormFalsyTest);
        fixture = TestBed.createComponent(SelectProductComponent);
        const app = fixture.debugElement.componentInstance;

        await fixture.detectChanges();
        const result = app.isProductUsed(testProduct);

        expect(result).toBeFalsy();
    });
    it('onProductClick should call calculationService.shortenNutriotionValues with correct nutrition object', async () => {
        fixture = TestBed.createComponent(SelectProductComponent);
        const app = fixture.debugElement.componentInstance;

        await fixture.detectChanges();

        app.onProductClick(testProduct);

        expect(calculationService.shortenNutritionValues).toHaveBeenCalledWith({
            PROCNT: {
                description: 'Protein',
                unit: 'g',
                value: 0.90
            },
            FAT: {
                description: 'Total lipid (fat)',
                unit: 'g',
                value: 81.11
            },
            CHOCDF: {
                description: 'Carbohydrate, by difference',
                unit: 'g',
                value: 0.06
            },
            ENERC_KCAL: {
                description: 'Energy',
                unit: 'kcal',
                value: 717
            },
            SUGAR: {
                description: 'Sugars, total',
                unit: 'g',
                value: 0.06
            },
            FIBTG: {
                description: 'Fiber, total dietary',
                unit: 'g',
                value: 0
            },
            CA: {
                description: 'Calcium, Ca',
                unit: 'mg',
                value: 24
            },
            FE: {
                description: 'Iron, Fe',
                unit: 'mg',
                value: 0.02
            },
            P: {
                description: 'Phosphorus, P',
                unit: 'mg',
                value: 24
            },
            K: {
                description: 'Potassium, K',
                unit: 'mg',
                value: 24
            },
            NA: {
                description: 'Sodium, Na',
                unit: 'mg',
                value: 643
            },
            VITA_IU: {
                description: 'Vitamin A, IU',
                unit: 'IU',
                value: 2499
            },
            TOCPHA: {
                description: 'Vitamin E (alpha-tocopherol)',
                unit: 'mg',
                value: 2.32
            },
            VITD: {
                description: 'Vitamin D',
                unit: 'IU',
                value: 0
            },
            VITC: {
                description: 'Vitamin C, total ascorbic acid',
                unit: 'mg',
                value: 0
            },
            VITB12: {
                description: 'Vitamin B-12',
                unit: 'µg',
                value: 0.17
            },
            FOLAC: {
                description: 'Folic acid',
                unit: 'µg',
                value: 0
            },
            CHOLE: {
                description: 'Cholesterol',
                unit: 'mg',
                value: 0
            },
            FATRN: {
                description: 'Fatty acids, total trans',
                unit: 'g',
                value: 3.278
            },
            FASAT: {
                description: 'Fatty acids, total saturated',
                unit: 'g',
                value: 51.368
            },
            FAMS: {
                description: 'Fatty acids, total monounsaturated',
                unit: 'g',
                value: 21.021
            },
            FAPU: {
                description: 'Fatty acids, total polyunsaturated',
                unit: 'g',
                value: 3.043
            }
        });
    });
    it('onProductClick should call calculationService.shortenNutriotionValues with correct nutrition object', async () => {
        fixture = TestBed.createComponent(SelectProductComponent);
        const app = fixture.debugElement.componentInstance;
        calculationService.shortenNutritionValues.calls.reset();
        await fixture.detectChanges();

        app.onProductClick(testProduct);

        expect(calculationService.shortenNutritionValues).toHaveBeenCalledTimes(1);
    });
    it('onProductClick emits showProduct event with correct product', async () => {
        // let testProduct2 = {
        //     code: 1001,
        //     description: 'testItem2',
        //     foodGroup: 'Dairy and Egg Products',
        //     measures: [
        //         {
        //             measure: 'g',
        //             amount: 1,
        //             gramsPerMeasure: 1
        //         },
        //     ],
        //     nutrition: {
        //         PROCNT: {
        //             description: 'Protein',
        //             unit: 'g',
        //             value: 0.90
        //         },
        //         FAT: {
        //             description: 'Total lipid (fat)',
        //             unit: 'g',
        //             value: 81.11
        //         },
        //         CHOCDF: {
        //             description: 'Carbohydrate, by difference',
        //             unit: 'g',
        //             value: 0.06
        //         },
        //         ENERC_KCAL: {
        //             description: 'Energy',
        //             unit: 'kcal',
        //             value: 717
        //         },
        //         SUGAR: {
        //             description: 'Sugars, total',
        //             unit: 'g',
        //             value: 0.06
        //         },
        //         FIBTG: {
        //             description: 'Fiber, total dietary',
        //             unit: 'g',
        //             value: 0
        //         },
        //         CA: {
        //             description: 'Calcium, Ca',
        //             unit: 'mg',
        //             value: 24
        //         },
        //         FE: {
        //             description: 'Iron, Fe',
        //             unit: 'mg',
        //             value: 0.02
        //         },
        //         P: {
        //             description: 'Phosphorus, P',
        //             unit: 'mg',
        //             value: 24
        //         },
        //         K: {
        //             description: 'Potassium, K',
        //             unit: 'mg',
        //             value: 24
        //         },
        //         NA: {
        //             description: 'Sodium, Na',
        //             unit: 'mg',
        //             value: 643
        //         },
        //         VITA_IU: {
        //             description: 'Vitamin A, IU',
        //             unit: 'IU',
        //             value: 2499
        //         },
        //         TOCPHA: {
        //             description: 'Vitamin E (alpha-tocopherol)',
        //             unit: 'mg',
        //             value: 2.32
        //         },
        //         VITD: {
        //             description: 'Vitamin D',
        //             unit: 'IU',
        //             value: 0
        //         },
        //         VITC: {
        //             description: 'Vitamin C, total ascorbic acid',
        //             unit: 'mg',
        //             value: 0
        //         },
        //         VITB12: {
        //             description: 'Vitamin B-12',
        //             unit: 'µg',
        //             value: 0.17
        //         },
        //         FOLAC: {
        //             description: 'Folic acid',
        //             unit: 'µg',
        //             value: 0
        //         },
        //         CHOLE: {
        //             description: 'Cholesterol',
        //             unit: 'mg',
        //             value: 0
        //         },
        //         FATRN: {
        //             description: 'Fatty acids, total trans',
        //             unit: 'g',
        //             value: 3.278
        //         },
        //         FASAT: {
        //             description: 'Fatty acids, total saturated',
        //             unit: 'g',
        //             value: 51.368
        //         },
        //         FAMS: {
        //             description: 'Fatty acids, total monounsaturated',
        //             unit: 'g',
        //             value: 21.021
        //         },
        //         FAPU: {
        //             description: 'Fatty acids, total polyunsaturated',
        //             unit: 'g',
        //             value: 3.043
        //         }
        //     }
        // };

        fixture = TestBed.createComponent(SelectProductComponent);
        calculationService.shortenNutritionValues.calls.reset();
        const app = fixture.debugElement.componentInstance;
        await fixture.detectChanges();

        app.onProductClick(testProduct);
        app.showProduct.subscribe((value) => {
            expect(value.nutrition).toEqual({
                PROCNT: {
                    description: 'Protein',
                    unit: 'g',
                    value: 0
                },
                FAT: {
                    description: 'Total lipid (fat)',
                    unit: 'g',
                    value: 81
                },
                CHOCDF: {
                    description: 'Carbohydrate, by difference',
                    unit: 'g',
                    value: 0
                },
                ENERC_KCAL: {
                    description: 'Energy',
                    unit: 'kcal',
                    value: 717
                },
                SUGAR: {
                    description: 'Sugars, total',
                    unit: 'g',
                    value: 0
                },
                FIBTG: {
                    description: 'Fiber, total dietary',
                    unit: 'g',
                    value: 0
                },
                CA: {
                    description: 'Calcium, Ca',
                    unit: 'mg',
                    value: 24
                },
                FE: {
                    description: 'Iron, Fe',
                    unit: 'mg',
                    value: 0
                },
                P: {
                    description: 'Phosphorus, P',
                    unit: 'mg',
                    value: 24
                },
                K: {
                    description: 'Potassium, K',
                    unit: 'mg',
                    value: 24
                },
                NA: {
                    description: 'Sodium, Na',
                    unit: 'mg',
                    value: 643
                },
                VITA_IU: {
                    description: 'Vitamin A, IU',
                    unit: 'IU',
                    value: 2499
                },
                TOCPHA: {
                    description: 'Vitamin E (alpha-tocopherol)',
                    unit: 'mg',
                    value: 2
                },
                VITD: {
                    description: 'Vitamin D',
                    unit: 'IU',
                    value: 0
                },
                VITC: {
                    description: 'Vitamin C, total ascorbic acid',
                    unit: 'mg',
                    value: 0
                },
                VITB12: {
                    description: 'Vitamin B-12',
                    unit: 'µg',
                    value: 0
                },
                FOLAC: {
                    description: 'Folic acid',
                    unit: 'µg',
                    value: 0
                },
                CHOLE: {
                    description: 'Cholesterol',
                    unit: 'mg',
                    value: 0
                },
                FATRN: {
                    description: 'Fatty acids, total trans',
                    unit: 'g',
                    value: 3
                },
                FASAT: {
                    description: 'Fatty acids, total saturated',
                    unit: 'g',
                    value: 51
                },
                FAMS: {
                    description: 'Fatty acids, total monounsaturated',
                    unit: 'g',
                    value: 21
                },
                FAPU: {
                    description: 'Fatty acids, total polyunsaturated',
                    unit: 'g',
                    value: 3
                }
            });
        });
    });
    it('useSelectedProductEmitter should emit correct product through recipeHelper.emitproduct', async () => {
        fixture = TestBed.createComponent(SelectProductComponent);
        calculationService.shortenNutritionValues.calls.reset();
        const app = fixture.debugElement.componentInstance;
        await fixture.detectChanges();

        app.useSelectedProductEmitter(testProduct);
        expect(recipeHelper.emitProduct).toHaveBeenCalledTimes(1);
        expect(recipeHelper.emitProduct).toHaveBeenCalledWith(testProduct);
    });
});
