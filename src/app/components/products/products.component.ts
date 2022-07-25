import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import {
  ActionEvent,
  AppDataState,
  DataStateEnum,
  ProductActionsTypes,
} from 'src/app/state/state';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  //products$:Observable<Product[]>|null=null;
  productsData$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;
  constructor(private _productService: ProductsService) {}

  ngOnInit(): void {}

  getAllProduct() {
    //  this.products$=this._productService.getAllProducts();
    this.productsData$ = this._productService.getAllProducts().pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }
  getSelectedProducts() {
    this.productsData$ = this._productService.getSelectedProducts().pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }
  getAvailableProduct() {
    this.productsData$ = this._productService.getAvailableProducts().pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSearch(dataForm: any) {
    this.productsData$ = this._productService
      .getSearchProducts(dataForm.keyword)
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError((err) =>
          of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
        )
      );
  }

  onSelect(p: Product) {
    this._productService.select(p).subscribe((data) => {
      p.selected = data.selected;
    });
  }
  onDelete(p: Product) {
    this._productService.deleteProduct(p).subscribe((data) => {
      this.getAllProduct();
    });
  }

  onActionEvent(event: ActionEvent) {
    switch (event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS:
        this.getAllProduct();
        break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:
        this.getSelectedProducts();
        break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:
        this.getAvailableProduct();
        break;
      case ProductActionsTypes.SEARCH_PRODUCTS:
        this.onSearch(event.payload);
        break;
      case ProductActionsTypes.SELECT_PRODUCT:
        this.onSelect(event.payload);
        break;
      case ProductActionsTypes.DELETE_PRODUCT:
        this.onDelete(event.payload);
        break;
    }
  }
}
