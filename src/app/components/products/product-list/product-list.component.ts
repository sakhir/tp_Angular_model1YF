import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import {
  ActionEvent,
  AppDataState,
  DataStateEnum,
  ProductActionsTypes,
} from 'src/app/state/state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() productsData$: Observable<AppDataState<Product[]>> | null = null;
  @Output() productlistEvent: EventEmitter<ActionEvent> =
    new EventEmitter<ActionEvent>();

  readonly DataStateEnum = DataStateEnum;
  constructor() {}

  ngOnInit(): void {}

  onSelect(p: Product) {
    this.productlistEvent.emit({
      type: ProductActionsTypes.SELECT_PRODUCT,
      payload: p,
    });
  }

  onDelete(p: Product) {
    this.productlistEvent.emit({
      type: ProductActionsTypes.DELETE_PRODUCT,
      payload: p,
    });
  }

  onActionEvent($event :  ActionEvent) {
    this.productlistEvent.emit($event);
  }
}
