import { FormEvent, useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { hiddenAlertAction, showAlertAction } from '../actions/alertActions';
import { updateProductAction } from '../actions/productActions';
import { IProduct } from '../dtos/ProductDto';
import { RootState } from './NewProduct';

const EditProduct = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [product, setProduct] = useState<IProduct>({
    nameProduct: '',
    price: 0,
  });

  const productEdit: any = useSelector<RootState>(
    (state) => state.products.product
  );

  const alert = useSelector(
    (state: RootState) => state.alertMessage.alertMessage
  );

  useEffect(() => {
    setProduct(productEdit);
  }, [productEdit]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  if (!product) return null;

  const { nameProduct, price } = product;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameProduct.trim() === '' || price <= 0) {
      const response = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase pe',
      };
      dispatch(showAlertAction(response));
      return;
    }

    dispatch(hiddenAlertAction());

    dispatch(updateProductAction(product));
    history.push('/');
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>

            {alert ? <p className={alert.classes}>{alert.msg}</p> : null}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombre Producto"
                  name="nameProduct"
                  onChange={handleOnChange}
                  value={nameProduct}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombre Producto"
                  name="price"
                  onChange={handleOnChange}
                  value={price}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
