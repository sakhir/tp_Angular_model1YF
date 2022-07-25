import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/state';

@Component({
  selector: 'app-product-nav-bar',
  templateUrl: './product-nav-bar.component.html',
  styleUrls: ['./product-nav-bar.component.scss'],
})
export class ProductNavBarComponent implements OnInit {
  constructor() {}

  // declarer une variable de sortie dans laquelle on va mettre l'objet à envoyer du  fils vers le parent

  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  ngOnInit(): void {}

  getAllProduct() {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.GET_ALL_PRODUCTS,
    });
  }

  getSelectedProducts() {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.GET_SELECTED_PRODUCTS,
    });
  }

  getAvailableProduct() {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS,
    });
  }
  onSearch(value: any) {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.SEARCH_PRODUCTS,
      payload: value,
    });
  }
}
