import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Products from './components/Products';
import NewProduct from './components/NewProduct';
import EditProduct from './components/EditProduct';
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/productos/nuevo" component={NewProduct} />
            <Route exact path="/productos/editar/:id" component={EditProduct} />
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
