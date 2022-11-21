import {makeAutoObservable} from "mobx";
import {deleteProductFromBasket} from "../http/productAPI";

export default class BasketStoreStore {
    constructor() {
        this._totalPrice = 0;
        this._basket = [];
        makeAutoObservable(this);
    }

    async setDeleteItemBasket(product, isAuth = false) {
        if(isAuth) {
            await deleteProductFromBasket(product.id).then(() => {
                this._basket = this._basket.filter(item => item.id !== product.id);
                this._totalPrice -=  product.price * product.count;
            });
        } else {
            this._basket = this._basket.filter(item => item.id !== product.id);
            this._totalPrice -=  product.price * product.count;

            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setBasket(item, isAuth = false) {
        const checkProductInBasket = this._basket.findIndex(product => product.id === item.id);
        if(checkProductInBasket < 0) {
            this._basket = [...this._basket, { count: 1, ...item}];
            let totalPrice = 0;
            this._basket.forEach(product => totalPrice += Number(product.price * product.count));
            this._totalPrice = totalPrice;
        }

        if(!isAuth) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setDeleteAllProductFromBasket() {
        this._totalPrice = 0;
        return this._basket = [];
    }

    setCountProduct(productId, action, isAuth = false) {
        const itemInd = this._basket.findIndex(item => item.id === productId);
        const itemInState = this._basket.find(product => product.id === productId);
        if (action === "+") {
            const newItem = {
                ...itemInState,
                count: ++itemInState.count
            }
            this._basket = [...this._basket.slice(0, itemInd), newItem, ...this._basket.slice(itemInd + 1)]
        } else {
            const newItem = {
                ...itemInState,
                count: itemInState.count === 1 ? 1 : --itemInState.count
            }
            this._basket = [...this._basket.slice(0, itemInd), newItem, ...this._basket.slice(itemInd + 1)]
        }

        if(!isAuth) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
        }

        let totalPrice = 0;
        this._basket.forEach(product => totalPrice += Number(product.price * product.count));
        this._totalPrice = totalPrice;
    }

    resetBasket() {
        this._basket = [];
        this._totalPrice = 0;
        localStorage.removeItem('basket');
    }


    get Basket() {
        return this._basket;
    }

    get Price() {
        return this._totalPrice;
    }
}
