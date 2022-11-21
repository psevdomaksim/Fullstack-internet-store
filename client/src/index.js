import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import BasketStoreStore from "./store/BasketStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={
        {
            user: new UserStore(),
            product: new ProductStore(),
            basket: new BasketStoreStore(),
        }
    }>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);