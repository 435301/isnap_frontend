import axios from "axios";
import BASE_URL from "../../config/config";

// Action Types
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const PRODUCT_ERROR = "PRODUCT_ERROR";
export const CLEAR_PRODUCT_SUCCESS_MESSAGE = "CLEAR_PRODUCT_SUCCESS_MESSAGE";

// ✅ Auth Headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return token
        ? {
            headers: {
                Authorization: `Bearer ${token.trim()}`,
                "Content-Type": "application/json",
            },
        }
        : {};
};

// ✅ Fetch Products
export const fetchProducts = (page = 1, limit = 10, search = "", showStatus = "") => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    try {
        // Convert to string, keep "" if not set
        let validShowStatus = "";
        if (showStatus === "0" || showStatus === "1") {
            validShowStatus = showStatus;
        }

        const response = await axios.post(
            `${BASE_URL}/productListing/list`,
            { page, limit, search, showStatus: validShowStatus },
            getAuthHeaders()
        );

        if (response.data.status) {
            const { productListings = [], currentPage = 1, totalPages = 1 } = response.data.data || {};

            const mappedProducts = productListings.map((prod) => ({
                id: prod.id,
                fromQty: prod.fromQty,
                toQty: prod.toQty,
                price: prod.price,
                status: Number(prod.status), // keep number for UI
            }));

            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                payload: { products: mappedProducts, currentPage, totalPages },
            });
        } else {
            dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({
            type: FETCH_PRODUCTS_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};



// ✅ Create Product
export const createProduct = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/productListing/create`, data, getAuthHeaders());

    if (response.data.status) {
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: response.data.data,
      });
      return response.data;
    } else {
      return Promise.reject({
        message: response.data.message,
        data: response.data.data || null,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    return Promise.reject({
      message: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Update Product
export const updateProduct = (productData) => async (dispatch) => {
  try {
    const { id, fromQty, toQty, price, status } = productData;

    const response = await axios.put(
      `${BASE_URL}/productListing/update/${id}`,
      { fromQty, toQty, price, status }, // status is string "0" or "1"
      getAuthHeaders()
    );

    if (response.data.status) {
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: productData });
    } else {
      // Server responded with status 200 but status=false in body
      throw new Error(response.data.message || "Failed to update product");
    }
  } catch (error) {
    // Extract actual backend message if it exists
    const msg =
      error.response?.data?.message || error.message || "Something went wrong";

    dispatch({ type: PRODUCT_ERROR, payload: msg });

    // Throw the extracted message so the component can catch it
    throw new Error(msg);
  }
};

// ✅ Delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/productListing/delete/${id}`, getAuthHeaders());
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: error.response?.data?.message || error.message,
        });
        throw error;
    }
};

// ✅ Clear Success Message
export const clearProductSuccessMessage = () => ({
    type: CLEAR_PRODUCT_SUCCESS_MESSAGE,
});
