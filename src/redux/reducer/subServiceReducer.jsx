// src/redux/reducers/subServiceReducer.js

import {
  FETCH_SUBSERVICES_REQUEST,
  FETCH_SUBSERVICES_SUCCESS,
  FETCH_SUBSERVICES_FAILURE,
} from "../actions/subServiceActions";

const initialState = {
  loading: false,
  subServices: [],  // array of subservices
  error: null,
};

const subServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBSERVICES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUBSERVICES_SUCCESS:
      // depending on your API response, action.payload might include .subServices
      // or the array directly
      // e.g. response.data.data.subServices OR response.data.data
      let subs = [];
      if (action.payload.subServices) {
        subs = action.payload.subServices;
      } else if (Array.isArray(action.payload)) {
        subs = action.payload;
      } else if (action.payload.data && Array.isArray(action.payload.data.subServices)) {
        subs = action.payload.data.subServices;
      } else {
        // try fallback
        subs = [];
      }
      return {
        ...state,
        loading: false,
        subServices: subs,
        error: null,
      };
    case FETCH_SUBSERVICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        subServices: [],
      };
    default:
      return state;
  }
};

export default subServiceReducer;
