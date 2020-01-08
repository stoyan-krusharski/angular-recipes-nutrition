import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'newrecipe', loadChildren: () => import('./new-recipe/new-recipe.module').then(m => m.NewRecipeModule)},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },

  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },

  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
