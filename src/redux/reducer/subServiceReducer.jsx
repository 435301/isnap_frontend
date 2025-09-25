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

// src/redux/reducers/subServiceReducer.js
const subServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBSERVICES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUBSERVICES_SUCCESS:
      let subs = [];
      if (action.payload.subServices) {
        subs = action.payload.subServices;
      } else if (Array.isArray(action.payload)) {
        subs = action.payload;
      } else if (action.payload.data && Array.isArray(action.payload.data.subServices)) {
        subs = action.payload.data.subServices;
      } else {
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

    // Add this case for updating a sub-service in the array
    case "UPDATE_SUB_SERVICE_SUCCESS":
      return {
        ...state,
        subServices: state.subServices.map((sub) =>
          sub.id === action.payload.id ? { ...sub, ...action.payload } : sub
        ),
      };

    default:
      return state;
  }
};


export default subServiceReducer;
