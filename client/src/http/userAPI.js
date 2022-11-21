import { $authHost, $host } from "./http";
import jwt_token from "jwt-decode";

export const registration = async (email, password, role) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role,
  });

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);
  return jwt_token(data.token);
};

export const login = async (email, password, role) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
    role,
  });
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);
  return jwt_token(data.token);
};

export const check = async () => {
  const { data } = await $authHost.post("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_token(data.token);
};

export const createUser = async (user) => {
  const { data } = await $authHost.post("api/user", user);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await $authHost.delete(`api/user/${id}`);
  return data;
};

export const fetchUsers = async () => {
  const { data } = await $authHost.get("api/user");
  return data;
};

export const fetchOneUser = async (id) => {
  const { data } = await $authHost.get("api/user/" + id);
  return data;
};
