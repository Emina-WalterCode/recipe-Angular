import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';

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

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.subscription = this.recipeService.recepiesChanges.subscribe((recipes => {
      this.recipes = recipes;
    }))
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
  this.subscription.unsubscribe();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
