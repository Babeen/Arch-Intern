import api from "./api";

export const getProducts = async () => {
  try {
    const response = await api.get("/products");

    return response.data;

  } catch (error) {

    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch products"
    );
  }
};

export const getSingleProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);

    return response.data;

  } catch (error) {

    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch product"
    );
  }
};