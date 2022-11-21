import {
    ADMIN_ROUTE,
    BASKET_ROUTE, PRODUCT_EDIT_ROUTE,
    PRODUCT_ROUTE,
    LOGIN_ROUTE, ORDERING_ROUTE,
    ORDERS_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from './utils/consts';

import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import ProductPage from "./pages/ProductPage";
import BasketPage from "./pages/BasketPage";
import OneOrder from "./pages/OneOrder";
import ProductPageEdit from "./pages/ProductPageEdit";
import Ordering from "./pages/Ordering";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: ORDERS_ROUTE + '/:id',
        Component: OneOrder
    },
    {
        path: PRODUCT_EDIT_ROUTE + '/:id',
        Component: ProductPageEdit
    },

];

export const publicRoutes = [
    {
        path: ORDERING_ROUTE,
        Component: Ordering
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: BASKET_ROUTE,
        Component: BasketPage
    },
];


