import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  deleteNewProductAction,
  getActualProductAction,
} from '../actions/productActions';
import Swal from 'sweetalert2';
import { IProduct } from '../dtos/ProductDto';

interface ProductProps {
  product: IProduct;
}

const Product: FC<ProductProps> = ({ product }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { nameProduct, price, id } = product;

  const getProduct = (product: IProduct) => {
    history.push(`/productos/editar/${id}`);
    dispatch(getActualProductAction(product));
  };

  const deleteProduct = (id: number | undefined) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Un producto que se eleimina no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        dispatch(deleteNewProductAction(id));
      }
    });
  };

  return (
    <tr>
      <td>{nameProduct}</td>
      <td>
        <span className="font-weight-bold">$ {price}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => getProduct(product)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteProduct(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Product;
