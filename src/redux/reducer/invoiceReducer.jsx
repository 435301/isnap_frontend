import {
  REQUEST_INVOICE_REQUEST,
  REQUEST_INVOICE_SUCCESS,
  REQUEST_INVOICE_FAILURE,
  UPLOAD_INVOICE_REQUEST,
  UPLOAD_INVOICE_SUCCESS,
  UPLOAD_INVOICE_FAILURE,
  CREATE_INVOICE_REQUEST,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILURE,
  GET_INVOICE_SERVICES_REQUEST,
  GET_INVOICE_SERVICES_SUCCESS,
  GET_INVOICE_SERVICES_FAILURE,
  FETCH_INVOICES_REQUEST,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
} from "../actions/invoiceAction";

const initialState = {
  loading: false,
  requestInvoiceData: null,
  uploadInvoiceData: null,
  invoiceData: null,
  invoice: null,
  services: [],
  error: null,
  invoiceSeller: [],
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
    case CREATE_INVOICE_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_INVOICE_SUCCESS:
      return { ...state, loading: false, invoiceData: action.payload, };
    case CREATE_INVOICE_FAILURE:
      return { ...state, loading: false, error: action.payload, };
    case GET_INVOICE_SERVICES_REQUEST:
      return { ...state, loading: true, error: null, };
    case GET_INVOICE_SERVICES_SUCCESS:
      return { ...state, loading: false, invoice: action.payload.data.invoice, services: action.payload.data.services, };
    case GET_INVOICE_SERVICES_FAILURE:
      return { ...state, loading: false, error: action.payload, };
    case FETCH_INVOICES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_INVOICES_SUCCESS:
      return { ...state, loading: false, invoiceSeller: action.payload };
    case FETCH_INVOICES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
