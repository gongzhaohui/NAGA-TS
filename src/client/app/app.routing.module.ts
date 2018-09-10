import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { AppComponent } from './components/app.component';
import { RecipeDetailsComponent } from './components/recipes/recipe-details/recipe-details.component';
import { CanDeactivateGuardService } from './guards/can-deactivate-guard.service';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes'
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id',
        component: RecipeDetailsComponent,
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent
      }
    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    // children: [
    //   {
    //     path: ''
    //   }
    // ]
  },
  {
    path: '**',
    redirectTo: 'recipes'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
