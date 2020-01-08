import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeHelperService } from '../../core/recipe-helper.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input()
  public username = '';

  @Input()
  public isLoggedIn = false;

  public isNavbarCollapsed = true;
  public isHamburgerActive = false;

  @Output()
  public logout = new EventEmitter<undefined>();

  public constructor(
    private readonly router: Router,
    private readonly recipeHelperService: RecipeHelperService
  ) {}

  public get searchCallback(): () => void {
    return this.searchNavigationCallback.bind(this);
  }

  private searchNavigationCallback(): void {
    this.router.navigate(['/heroes']);
  }

  public triggerLogout() {
    this.logout.emit();
  }

  public emitNullUpdateRecipe() {
    this.recipeHelperService.emitRecipeToUpdate(null);
    this.recipeHelperService.emitProduct(null);
    this.recipeHelperService.emitSubrecipe(null);
  }
}
