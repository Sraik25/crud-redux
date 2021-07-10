import { IProduct, IProductState } from '../dtos/ProductDto';

const initialState: IProductState = {
  products: [],
  error: null,
  loading: false,
  deleteProduct: 0,
  product: null,
};

export type ACTIONTYPE =
  | { type: 'ADD_PRODUCT' }
  | { type: 'ADD_PRODUCT_ERROR' }
  | { type: 'ADD_PRODUCT_SUCCESS'; payload: IProduct }
  | { type: 'GET_PRODUCT' }
  | { type: 'GET_PRODUCT_ERROR' }
  | { type: 'GET_PRODUCT_SUCCESS'; payload: IProduct[] }
  | { type: 'DELETE_PRODUCT' }
  | { type: 'DELETE_PRODUCT_ERROR' }
  | { type: 'DELETE_PRODUCT_SUCCESS'; payload: number | undefined }
  | { type: 'GET_ACTUAL_PRODUCT'; payload: IProduct }
  | { type: 'UPDATE_PRODUCT' }
  | { type: 'UPDATE_PRODUCT_ERROR' }
  | { type: 'UPDATE_PRODUCT_SUCCESS'; payload: IProduct };

const productReducer = (
  state = initialState,
  action: ACTIONTYPE
): IProductState => {
  switch (action.type) {
    case 'ADD_PRODUCT':
    case 'GET_PRODUCT':
    case 'DELETE_PRODUCT':
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        loading: true,
      };

    case 'ADD_PRODUCT_ERROR':
    case 'GET_PRODUCT_ERROR':
    case 'DELETE_PRODUCT_ERROR':
    case 'UPDATE_PRODUCT_ERROR':
      return {
        ...state,
        error: true,
      };

    case 'ADD_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };

    case 'GET_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case 'DELETE_PRODUCT_SUCCESS':
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
        deleteProduct: null,
      };

    case 'GET_ACTUAL_PRODUCT':
      return {
        ...state,
        product: action.payload,
      };

    case 'UPDATE_PRODUCT_SUCCESS':
      return {
        ...state,
        product: null,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
