import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";

// Action Types
export const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const CATEGORY_ERROR = "CATEGORY_ERROR";
export const CLEAR_CATEGORY_SUCCESS_MESSAGE = "CLEAR_CATEGORY_SUCCESS_MESSAGE";
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";

// Auth Headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token
    ? { headers: { Authorization: `Bearer ${token.trim()}`, "Content-Type": "application/json" } }
    : {};
};

// Fetch categories
export const fetchCategories = (page = 1, limit = 10, search = "", showStatus = "") => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });

    try {
      let validShowStatus = "";
      if (showStatus === 0 || showStatus === 1) validShowStatus = showStatus;

      const response = await axios.post(
        `${BASE_URL}/serviceCategory/list`,
        { page, limit, search, showStatus: validShowStatus },
        getAuthHeaders()
      );

      if (response.data.status) {
        const { serviceCategories, totalPages, currentPage } = response.data.data;

        const mappedCategories = serviceCategories.map((cat) => ({
          ...cat,
          categoryName: cat.serviceCategoryName,
          categoryCode: cat.serviceCategoryCode,
        }));

        dispatch({
          type: FETCH_CATEGORIES_SUCCESS,
          payload: { categories: mappedCategories, currentPage, totalPages },
        });
      } else {
        dispatch({
          type: FETCH_CATEGORIES_FAILURE,
          payload: response.data.message || "Failed to fetch categories",
        });
        toast.error(response.data.message || "Failed to fetch categories");
      }
    } catch (error) {
      dispatch({
        type: FETCH_CATEGORIES_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
      toast.error(error.response?.data?.message || error.message);
    }
  };
};

// Create category
export const createCategory = (categoryData) => async (dispatch) => {
  try {
    const payload = {
      serviceCategoryName: categoryData.serviceCategoryName,
      serviceCategoryCode: categoryData.serviceCategoryCode,
      status: categoryData.serviceStatus ? 1 : 0,
    };

    const response = await axios.post(
      `${BASE_URL}/serviceCategory/create`,
      payload,
      getAuthHeaders()
    );

    if (response.data.status) {
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: {
          data: response.data.data,
          message: "Service category created successfully!",
        },
      });
      return response.data.data;
    } else {
      dispatch({ type: CATEGORY_ERROR, payload: response.data.message });
      throw new Error(response.data.message);
    }
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};


// Update category
export const updateCategory = (categoryData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/serviceCategory/update/${categoryData.id}`,
      {
        serviceCategoryName: categoryData.categoryName,
        serviceCategoryCode: categoryData.categoryCode,
        status: categoryData.status,
      },
      getAuthHeaders()
    );

    if (response.data.status) {
      const mappedCategory = {
        id: categoryData.id,
        categoryName: response.data.data?.serviceCategoryName || categoryData.categoryName,
        categoryCode: response.data.data?.serviceCategoryCode || categoryData.categoryCode,
        status: response.data.data?.status ?? categoryData.status,
      };

      dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: mappedCategory });
      return mappedCategory;
    } else {
      dispatch({
        type: CATEGORY_ERROR,
        payload: response.data.message || "Failed to update category",
      });
      toast.error(response.data.message || "Failed to update category");
      return Promise.reject({ message: response.data.message || "Failed to update category" });
    }
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || error.message);
    return Promise.reject({
      message: error.response?.data?.message || error.message,
    });
  }
};

// Delete category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/serviceCategory/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });
  
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Clear success message
export const clearCategorySuccessMessage = () => ({
  type: CLEAR_CATEGORY_SUCCESS_MESSAGE,
});
