import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAction } from '../actions/productActions';
import { RootState } from './NewProduct';
import Product from './Product';

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = () => {
      dispatch(getProductsAction());
    };

    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const products = useSelector((state: RootState) => state.products.products);

  const error = useSelector((state: RootState) => state.products.error);

  const loading = useSelector((state: RootState) => state.products.loading);

  return (
    <>
      <h2 className="text-center my-5">Listado de Productos</h2>
      {error && (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un error
        </p>
      )}

      {loading && <p className="text-center">Cargando..</p>}

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Products;
