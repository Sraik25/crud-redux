import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { hiddenAlertAction, showAlertAction } from '../actions/alertActions';
import { createNewProductAction } from '../actions/productActions';
import { IProduct } from '../dtos/ProductDto';
import store from '../store';

export type RootState = ReturnType<typeof store.getState>;

const NewProduct = ({ history }: RouteComponentProps) => {
  const [nameProduct, setNameProduct] = useState('');
  const [price, setPrice] = useState(0);

  const loading = useSelector((state: RootState) => state.products.loading);
  const alert = useSelector(
    (state: RootState) => state.alertMessage.alertMessage
  );

  const error = useSelector((state: RootState) => state.products.error);

  const dispatch = useDispatch();

  const addproduct = (product: IProduct) =>
    dispatch(createNewProductAction(product));

  const submitNewProduct = (e: React.FormEvent<HTMLFormElement>) => {
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

    addproduct({ nameProduct, price });

    history.push('/');
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            {alert ? <p className={alert.classes}>{alert.msg}</p> : null}

            <form onSubmit={submitNewProduct}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombre Producto"
                  name="nameProduct"
                  value={nameProduct}
                  onChange={(e) => setNameProduct(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombre Producto"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar Producto
              </button>
            </form>
            {loading ? <p>Cargando..</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
