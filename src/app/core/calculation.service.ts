import { Injectable } from '@angular/core';
import { Nutrition } from '../models/nutrition';


@Injectable()
export class CalculationService {

    public constructor() { }

    shortenNutritionValues(nutrition: Nutrition): Nutrition {
        for (const key in nutrition) {
            if (nutrition.hasOwnProperty(key)) {
                nutrition[key].value = +(nutrition[key].value.toFixed(0));
            }
        }
        return nutrition;
    }

    sumNutritionValues(nutritionArray: Nutrition[]): Nutrition {
        return nutritionArray.reduce((acc, curr) => {
            for (const key in acc) {
                if (acc.hasOwnProperty(key)) {
                    acc[key].value += curr[key].value;
                }
            }
            return acc;
        }, {
                PROCNT: { description: 'Protein', unit: 'g', value: 0 },
                FAT:
                    { description: 'Total lipid (fat)', unit: 'g', value: 0 },
                CHOCDF:
                {
                    description: 'Carbohydrate, by difference',
                    unit: 'g',
                    value: 0
                },
                ENERC_KCAL: { description: 'Energy', unit: 'kcal', value: 0 },
                SUGAR: { description: 'Sugars, total', unit: 'g', value: 0 },
                FIBTG: { description: 'Fiber, total dietary', unit: 'g', value: 0 },
                CA: { description: 'Calcium, Ca', unit: 'mg', value: 0 },
                FE: { description: 'Iron, Fe', unit: 'mg', value: 0 },
                P: { description: 'Phosphorus, P', unit: 'mg', value: 0 },
                K: { description: 'Potassium, K', unit: 'mg', value: 0 },
                NA: { description: 'Sodium, Na', unit: 'mg', value: 0 },
                VITA_IU:
                    { description: 'Vitamin A, IU', unit: 'IU', value: 0 },
                TOCPHA:
                {
                    description: 'Vitamin E (alpha-tocopherol)',
                    unit: 'mg',
                    value: 0
                },
                VITD: { description: 'Vitamin D', unit: 'IU', value: 0 },
                VITC:
                {
                    description: 'Vitamin C, total ascorbic acid',
                    unit: 'mg',
                    value: 0
                },
                VITB12: { description: 'Vitamin B-12', unit: 'µg', value: 0 },
                FOLAC: { description: 'Folic acid', unit: 'µg', value: 0 },
                CHOLE: { description: 'Cholesterol', unit: 'mg', value: 0 },
                FATRN:
                {
                    description: 'Fatty acids, total trans',
                    unit: 'g',
                    value: 0
                },
                FASAT:
                {
                    description: 'Fatty acids, total saturated',
                    unit: 'g',
                    value: 0
                },
                FAMS:
                {
                    description: 'Fatty acids, total monounsaturated',
                    unit: 'g',
                    value: 0
                },
                FAPU:
                {
                    description: 'Fatty acids, total polyunsaturated',
                    unit: 'g',
                    value: 0
                }
            });
    }

    public calculateHelperProd(ing) {
        const measureOfItem = ing.calcArr.find((measure) => {
            return `${measure.amount} ${measure.measure}` === ing.measures;
        });
        const weightInGrams = measureOfItem.gramsPerMeasure * ing.amount;
        const totalNutritionValue = this.calculateNutrition(weightInGrams, ing.nutrition);

        return {
            weightInGrams,
            totalNutritionValue,
        };
    }
    public calculateHelperSub(sub) {
        const weightInGrams = sub.amount * sub.gramsPerMeasure;
        const totalNutritionValue = this.calculateNutrition(weightInGrams, sub.nutrition);

        return {
            weightInGrams,
            totalNutritionValue,
        };
    }
    public calculateNutrition(weightInGrams: number, nutrition: Nutrition) {
        const calculateNutrient = (wghtInGr, field) => {
            return wghtInGr * field.value / 100;
        };

        const nutrients = {
            PROCNT: JSON.parse(JSON.stringify(nutrition.PROCNT)),
            FAT: JSON.parse(JSON.stringify(nutrition.FAT)),
            CHOCDF: JSON.parse(JSON.stringify(nutrition.CHOCDF)),
            ENERC_KCAL: JSON.parse(JSON.stringify(nutrition.ENERC_KCAL)),
            SUGAR: JSON.parse(JSON.stringify(nutrition.SUGAR)),
            FIBTG: JSON.parse(JSON.stringify(nutrition.FIBTG)),
            CA: JSON.parse(JSON.stringify(nutrition.CA)),
            FE: JSON.parse(JSON.stringify(nutrition.FE)),
            P: JSON.parse(JSON.stringify(nutrition.P)),
            K: JSON.parse(JSON.stringify(nutrition.K)),
            NA: JSON.parse(JSON.stringify(nutrition.NA)),
            VITA_IU: JSON.parse(JSON.stringify(nutrition.VITA_IU)),
            TOCPHA: JSON.parse(JSON.stringify(nutrition.TOCPHA)),
            VITD: JSON.parse(JSON.stringify(nutrition.VITD)),
            VITC: JSON.parse(JSON.stringify(nutrition.VITC)),
            VITB12: JSON.parse(JSON.stringify(nutrition.VITB12)),
            FOLAC: JSON.parse(JSON.stringify(nutrition.FOLAC)),
            CHOLE: JSON.parse(JSON.stringify(nutrition.CHOLE)),
            FATRN: JSON.parse(JSON.stringify(nutrition.FATRN)),
            FASAT: JSON.parse(JSON.stringify(nutrition.FASAT)),
            FAMS: JSON.parse(JSON.stringify(nutrition.FAMS)),
            FAPU: JSON.parse(JSON.stringify(nutrition.FAPU)),
        };

        for (const nutrient in nutrients) {
            if (nutrients.hasOwnProperty(nutrient)) {
                nutrients[nutrient].value = calculateNutrient(weightInGrams, nutrients[nutrient]);
            }
        }
        return nutrients;
    }
}
