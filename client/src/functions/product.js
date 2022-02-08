import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByLimit = async (limit) => await axios.get(`${process.env.REACT_APP_API}/products/${limit}`);

export const getProduct = async (slug) => await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProducts = async (sort, order, page, perPage = 4) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
    perPage,
  });

export const getProductsCount = async () => await axios.get(`${process.env.REACT_APP_API}/products/total`);

export const getRelated = async (productId) => await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) => await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);