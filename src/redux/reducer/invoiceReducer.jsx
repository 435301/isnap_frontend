import {
  REQUEST_INVOICE_REQUEST,
  REQUEST_INVOICE_SUCCESS,
  REQUEST_INVOICE_FAILURE,
  UPLOAD_INVOICE_REQUEST,
  UPLOAD_INVOICE_SUCCESS,
  UPLOAD_INVOICE_FAILURE,
} from "../actions/invoiceAction";

const initialState = {
  loading: false,
  requestInvoiceData: null,
  uploadInvoiceData: null,
  error: null,
};

export const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_INVOICE_REQUEST:
    case UPLOAD_INVOICE_REQUEST:
      return { ...state, loading: true, error: null };

    case REQUEST_INVOICE_SUCCESS:
      return { ...state, loading: false, requestInvoiceData: action.payload };

    case UPLOAD_INVOICE_SUCCESS:
      return { ...state, loading: false, uploadInvoiceData: action.payload };

    case REQUEST_INVOICE_FAILURE:
    case UPLOAD_INVOICE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
