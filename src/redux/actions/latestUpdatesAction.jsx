import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";

export const FETCH_LATEST_UPDATES_REQUEST = "FETCH_LATEST_UPDATES_REQUEST";
export const FETCH_LATEST_UPDATES_SUCCESS = "FETCH_LATEST_UPDATES_SUCCESS";
export const FETCH_LATEST_UPDATES_FAILURE = "FETCH_LATEST_UPDATES_FAILURE";

export const fetchLatestUpdates = (payload = { search: "", page: 1, showStatus: "" }) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_LATEST_UPDATES_REQUEST });
        try {
            const response = await axios.post(`${BASE_URL}/latestUpdates/list`,payload, getAuthHeaders());

            if (response.data.status) {
                dispatch({ type: FETCH_LATEST_UPDATES_SUCCESS, payload: response.data.data });
            } else {
                dispatch({ type: FETCH_LATEST_UPDATES_FAILURE, payload: response.data.message || "No data found" });
            }
        } catch (error) {
            dispatch({ type: FETCH_LATEST_UPDATES_FAILURE, payload: error.message || "Something went wrong" });
        }
    };
};