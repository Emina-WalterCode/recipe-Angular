import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

interface Ingredient {
  name: string;
  amount: number;
}

interface Recipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recepiesChanges = new Subject<Recipe[]>();

  /*private recipes: Recipe[] = [
    {
      name: 'Strawberry cake',
      description: 'This is the first recipe of strawberry cake...',
      imagePath: 'https://images.unsplash.com/photo-1540660290370-8aa90e451e8a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      ingredients: [{
        name: 'Meat',
        amount: 1
      },
      {
        name: 'French Frizes',
        amount: 20
      }
    ]
    },
    {
      name: 'Cesar salad',
      description: 'This is something helthy...',
      imagePath: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
      ingredients: [{
        name: 'Buns',
        amount: 2
      },
      {
        name: 'Meat',
        amount: 1
      }
    ]
    }
  ];*/

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice(); //slice will return a new array which is copy of that array
  }
  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients)
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recepiesChanges.next(this.recipes.slice())
  }
  updateRecipe(index: number, newRecipe: Recipe) {
  this.recipes[index] = newRecipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recepiesChanges.next(this.recipes.slice())
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recepiesChanges.next(this.recipes.slice());
  }
}
