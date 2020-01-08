import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RecipeService } from '../../../core/recipe.service';


@Component({
  selector: 'app-ngbd-modal-delete-content',
  template: `
  <div class="row modal-body modalText">
    <div class="modalText mx-auto">
      Are you sure you would like to delete this recipe?
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary" (click)="delete()">Delete</button>
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
  </div>
  `,
  styleUrls: ['./modal-content.scss']
})
export class AppModalDeleteContentComponent {

  @Input() recipeId: string;

  constructor(
    public activeModal: NgbActiveModal,
    public recipeService: RecipeService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
  ) { }

  delete() {
    this.activeModal.close();
    this.recipeService.deleteRecipe(this.recipeId).subscribe(
      (res) => {
        this.toastr.success(`${res.message}`);
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.toastr.error(error.error.message);
      } );
  }
}
