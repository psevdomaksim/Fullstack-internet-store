import { $authHost, $host } from "./http";
import jwt_token from "jwt-decode";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const deleteType = async (id) => {
  const { data } = await $authHost.delete(`api/type/${id}`);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createForm = async (form) => {
  const { data } = await $authHost.post("api/form", form);
  return data;
};

export const deleteForm = async (id) => {
  const { data } = await $authHost.delete(`api/form/${id}`);
  return data;
};

export const fetchForms = async () => {
  const { data } = await $host.get("api/form");
  return data;
};

export const createProduct = async (product) => {
  const { data } = await $authHost.post("api/product", product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await $authHost.delete(`api/product/${id}`);
  return data;
};


export const fetchProducts = async (formId, page, limit = 5) => {
  const { data } = await $host.get("api/product", {
     params: {
      formId,
      page,
      limit,
    }, 
  });
  return data;
};
export const fetchOneProduct = async (id) => {
  const { data } = await $host.get("api/product/" + id);
  return data;
};

export const updateProducts = async (id, body) => {
  const {data} = await $authHost({method:'PUT', url:`api/product/${id}`, data: body});
  return data;
}

export const addProductToBasket = async (product) => {
  const {data} = await $authHost.post('api/basket', product);
  return data;
}

export const getProductFromBasket = async () => {
  const {data} = await $authHost.get('api/basket');
  return data;
}

export const deleteProductFromBasket = async (id) => {
  const {data} = await $authHost.delete(`api/basket/${id}`);
  return data;
}