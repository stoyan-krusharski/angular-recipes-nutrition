import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
    { path: '', component: NewRecipeComponent, pathMatch: 'full', canActivate: [AuthGuard], },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewRecipeRoutingModule {}
