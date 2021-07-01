import { Dispatch } from 'react';
import clientAxios from '../config/axios';
import { ACTIONTYPE } from '../reducers/productsReducer';
import Swal from 'sweetalert2';

export interface IProduct {
  id?: number;
  nameProduct: string;
  price: number;
}

export function createNewProductAction(product: IProduct) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(addProduct());

    try {
      await clientAxios.post('/productos', product);
      dispatch(addProductSuccess(product));

      Swal.fire('Correcto', 'El producto se agregó correctamente', 'success');
    } catch (error) {
      dispatch(addProductError());

      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intenta de nuevo',
      });
    }
  };
}

const addProduct = (): ACTIONTYPE => ({
  type: 'ADD_PRODUCT',
});

const addProductSuccess = (product: IProduct): ACTIONTYPE => ({
  type: 'ADD_PRODUCT_SUCCESS',
  payload: product,
});

const addProductError = (): ACTIONTYPE => ({
  type: 'ADD_PRODUCT_ERROR',
});

export function getProductsAction() {
  return async (dispatch: Dispatch<any>) => {
    dispatch(getProduct());

    try {
      const products = await clientAxios.get('/productos');
      dispatch(getProductSuccess(products.data));
    } catch (error) {
      dispatch(getProductError());

      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intenta de nuevo',
      });
    }
  };
}

const getProduct = (): ACTIONTYPE => ({
  type: 'GET_PRODUCT',
});

const getProductSuccess = (product: IProduct[]): ACTIONTYPE => ({
  type: 'GET_PRODUCT_SUCCESS',
  payload: product,
});

const getProductError = (): ACTIONTYPE => ({
  type: 'GET_PRODUCT_ERROR',
});

export function deleteNewProductAction(productId: number | undefined) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(deleteProduct());

    try {
      await clientAxios.delete(`/productos/${productId}`);
      dispatch(deleteProductSuccess(productId));

      Swal.fire(
        'Deleted',
        'El producto a sido eliminado correctamente',
        'success'
      );
    } catch (error) {
      dispatch(deleteProductError());

      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intenta de nuevo',
      });
    }
  };
}

const deleteProduct = (): ACTIONTYPE => ({
  type: 'DELETE_PRODUCT',
});

const deleteProductSuccess = (productId: number | undefined): ACTIONTYPE => ({
  type: 'DELETE_PRODUCT_SUCCESS',
  payload: productId,
});

const deleteProductError = (): ACTIONTYPE => ({
  type: 'DELETE_PRODUCT_ERROR',
});

export function getActualProductAction(product: IProduct) {
  return (dispatch: Dispatch<any>) => {
    dispatch(getActualProduct(product));
  };
}

const getActualProduct = (product: IProduct): ACTIONTYPE => ({
  type: 'GET_ACTUAL_PRODUCT',
  payload: product,
});
