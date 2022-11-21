import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._types = [];
    this._forms = [];
    this._products = [];
    this._selectedType = {};
    this._selectedForm = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 6;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setForms(forms) {
    this._forms = forms;
  }
  setProducts(products) {
    this._products = products;
  }
  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }
  setSelectedForm(form) {
    this.setPage(1);
    this._selectedForm = form;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }

  get types() {
    return this._types;
  }
  get forms() {
    return this._forms;
  }
  get products() {
    return this._products;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedForm() {
    return this._selectedForm;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
}
