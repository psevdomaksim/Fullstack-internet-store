import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._users =[]
    this._role = ""
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._isAuth = user;
  }
  setUsers(users) {
    this._users = users;
  }
  setRole(role) {
    this._role = role;
  }

  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get users() {
    return this._users;
  }
  get role() {
    return this._role;
  }
}
