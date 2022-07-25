export enum ProductActionsTypes {
    GET_ALL_PRODUCTS ="[product] get All products ",
    GET_SELECTED_PRODUCTS ="[product] get Selected products ",
    GET_AVAILABLE_PRODUCTS ="[product] get Available products ",
    SEARCH_PRODUCTS ="[product]  search products ",
    SELECT_PRODUCT ="[product]  select product ",
    DELETE_PRODUCT ="[product]  Delete product "
}

export interface ActionEvent {
    type : ProductActionsTypes,
    payload?:any;
}
export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}

export interface AppDataState<T> {
    dataState:DataStateEnum,
    data?: T,
    errorMessage?: string;
}
