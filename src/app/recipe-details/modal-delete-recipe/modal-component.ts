import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppModalDeleteContentComponent } from './modal-content/modal-content';

@Component({
  selector: 'app-ngbd-modal-delete-component',
  templateUrl: './modal-component.html'
})
export class AppModalDeleteComponent {

  @Input() recipeId: string;

  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(AppModalDeleteContentComponent);
    modalRef.componentInstance.recipeId = this.recipeId;
  }
}
