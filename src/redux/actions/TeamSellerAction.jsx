import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

// Executives
export const FETCH__MP_MANAGER_SELLER_LIST_REQUEST = "FETCH__MP_MANAGER_SELLER_LIST_REQUEST";
export const FETCH_MP_MANAGER_SELLER_LIST_SUCCESS = "FETCH_MP_MANAGER_SELLER_LIST_SUCCESS";
export const FETCH_MP_MANAGER_SELLER_LIST_FAILURE = "FETCH_MP_MANAGER_SELLER_LIST_FAILURE";

export const FETCH__MP_EXECUTIVES_SELLER_LIST_REQUEST = "FETCH__MP_EXECUTIVES_SELLER_LIST_REQUEST";
export const FETCH_MP_EXECUTIVES_SELLER_LIST_SUCCESS = "FETCH_MP_EXECUTIVES_SELLER_LIST_SUCCESS";
export const FETCH_MP_EXECUTIVES_SELLER_LIST_FAILURE = "FETCH_MP_EXECUTIVES_SELLER_LIST_FAILURE";

export const FETCH_DIGITAL_MARKETING_SELLER_LIST_REQUEST = "FETCH_DIGITAL_MARKETING_SELLER_LIST_REQUEST";
export const FETCH_DIGITAL_MARKETING_SELLER_LIST_SUCCESS = "FETCH_DIGITAL_MARKETING_SELLER_LIST_SUCCESS";
export const FETCH_DIGITAL_MARKETING_SELLER_LIST_FAILURE = "FETCH_DIGITAL_MARKETING_SELLER_LIST_FAILURE";

export const FETCH_PHOTOGRAPHY_SELLER_LIST_REQUEST = "FETCH_PHOTOGRAPHY_SELLER_LIST_REQUEST";
export const FETCH_PHOTOGRAPHY_SELLER_LIST_SUCCESS = "FETCH_PHOTOGRAPHY_SELLER_LIST_SUCCESS";
export const FETCH_PHOTOGRAPHY_SELLER_LIST_FAILURE = "FETCH_PHOTOGRAPHY_SELLER_LIST_FAILURE";

export const FETCH__SELLER_DETAILS_REQUEST = "FETCH__SELLER_DETAILS_REQUEST";
export const FETCH__SELLER_DETAILS_SUCCESS = "FETCH__SELLER_DETAILS_SUCCESS";
export const FETCH__SELLER_DETAILST_FAILURE = "FETCH__SELLER_DETAILST_FAILURE";

export const fetchMarketPlaceManagerSellerList =
    (payload = { page: "", search: "", showStatus: "" }) =>
        async (dispatch) => {
            try {
                dispatch({ type: FETCH__MP_MANAGER_SELLER_LIST_REQUEST });
                const response = await axios.post(
                    `${BASE_URL}/marketplaceManager/sellersList`,
                    payload,
                    getAuthHeaders()
                );
                dispatch({
                    type: FETCH_MP_MANAGER_SELLER_LIST_SUCCESS,
                    payload: response.data.data || [],
                });
            } catch (error) {
                dispatch({
                    type: FETCH_MP_MANAGER_SELLER_LIST_FAILURE,
                    payload: error.response?.data?.message || error.message,
                });

                toast.error(error.response?.data?.message || "Failed to fetch seller list");
            }
        };

export const fetchMarketPlaceExecutivesSellerList =
    (payload = { page: "", search: "", showStatus: "", source: "" }) =>
        async (dispatch) => {
            try {
                dispatch({ type: FETCH__MP_EXECUTIVES_SELLER_LIST_REQUEST });
                const response = await axios.post(
                    `${BASE_URL}/marketplaceExecutive/sellersList`,
                    payload,
                    getAuthHeaders()
                );
                dispatch({
                    type: FETCH_MP_EXECUTIVES_SELLER_LIST_SUCCESS,
                    payload: response.data.data || [],
                });
            } catch (error) {
                dispatch({
                    type: FETCH_MP_EXECUTIVES_SELLER_LIST_FAILURE,
                    payload: error.response?.data?.message || error.message,
                });

                toast.error(error.response?.data?.message || "Failed to fetch seller list");
            }
        };

export const fetchDigitalMarketingSellerList =
    (payload = { page: "", search: "", showStatus: "" }) =>
        async (dispatch) => {
            try {
                dispatch({ type: FETCH_DIGITAL_MARKETING_SELLER_LIST_REQUEST });
                const response = await axios.post(
                    `${BASE_URL}/digitalMarketingTeam/sellersList`, payload, getAuthHeaders());
                dispatch({
                    type: FETCH_DIGITAL_MARKETING_SELLER_LIST_SUCCESS,
                    payload: response.data.data || [],
                });
            } catch (error) {
                dispatch({
                    type: FETCH_DIGITAL_MARKETING_SELLER_LIST_FAILURE,
                    payload: error.response?.data?.message || error.message,
                });

                toast.error(error.response?.data?.message || "Failed to fetch seller list");
            }
        };

export const fetchPhotographySellerList =
    (payload = { page: "", search: "", showStatus: "" }) =>
        async (dispatch) => {
            try {
                dispatch({ type: FETCH_PHOTOGRAPHY_SELLER_LIST_REQUEST });
                const response = await axios.post(
                    `${BASE_URL}/photographyTeam/sellersList`, payload, getAuthHeaders());
                dispatch({
                    type: FETCH_PHOTOGRAPHY_SELLER_LIST_SUCCESS,
                    payload: response.data.data || [],
                });
            } catch (error) {
                dispatch({
                    type: FETCH_PHOTOGRAPHY_SELLER_LIST_FAILURE,
                    payload: error.response?.data?.message || error.message,
                });
                toast.error(error.response?.data?.message || "Failed to fetch seller list");
            }
        };

        export const fetchAllSellersDetailsById = (id) =>  async (dispatch) => {
            try {
                dispatch({ type: FETCH__SELLER_DETAILS_REQUEST });
                const response = await axios.get(
                    `${BASE_URL}/marketplaceManager/getSellerById/${id}`, getAuthHeaders());
                dispatch({
                    type: FETCH__SELLER_DETAILS_SUCCESS,
                    payload: response.data.data || {},
                });
            } catch (error) {
                dispatch({
                    type: FETCH__SELLER_DETAILST_FAILURE,
                    payload: error.response?.data?.message || error.message,
                });
                toast.error(error.response?.data?.message || "Failed to fetch seller list");
            }
        };