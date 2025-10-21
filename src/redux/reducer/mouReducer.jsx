// src/redux/reducers/mouStatusReducer.js
import {
  UPDATE_MOU_STATUS_REQUEST,
  UPDATE_MOU_STATUS_SUCCESS,
  UPDATE_MOU_STATUS_FAILURE,
  FETCH_MOU_REQUEST,
  FETCH_MOU_SUCCESS,
  FETCH_MOU_FAILURE,
  FETCH_REQUIRED_DOCS_REQUEST,
  FETCH_REQUIRED_DOCS_SUCCESS,
  FETCH_REQUIRED_DOCS_FAILURE,
  UPLOAD_DOCUMENT_REQUEST,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAILURE,
  ACCEPT_DOCUMENTS_REQUEST,
  ACCEPT_DOCUMENTS_SUCCESS,
  ACCEPT_DOCUMENTS_FAIL,
  REJECT_DOCUMENTS_REQUEST,
  REJECT_DOCUMENTS_SUCCESS,
  REJECT_DOCUMENTS_FAIL,
} from "../actions/mouAction";

const initialState = {
  loading: false,
  mouStatus: null, // current status
  mouList: [],
  serviceTypes: [],
  commissionPricings: [],
  error: null,
  documents: [],
  total: 0,
  documentsRejectedReason: "",
  uploadedDocument: null,
  documentStatus: null,
  success: false,
  message: null,
};

const mouStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MOU_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_MOU_STATUS_SUCCESS:
      return { ...state, loading: false, mouStatus: action.payload.mouStatus };
    case UPDATE_MOU_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_MOU_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MOU_SUCCESS:
      return {
        ...state,
        loading: false,
        mouList: action.payload.catalogListings || [],
        serviceTypes: action.payload.businessLaunches || [],
        commissionPricings: action.payload.keyAccountCommissions || [],
        digitalMarketing: action.payload.digitalMarketing || {},
        productPhotographys: action.payload.productPhotographys || [],
        keyAccountSubscriptions: action.payload.keyAccountSubscriptions || [],
        lifeStylePhotographys: action.payload.lifeStylePhotographys || [],
        modelPhotographys: action.payload.modelPhotographys || [],
        aContentPhotographys: action.payload.aContentPhotographys || [],
        storePhotographys: action.payload.storePhotographys || [],
        socialMediaContentPhotographys: action.payload.socialMediaContentPhotographys || [],
        keyAccountCommissions:action.payload.keyAccountCommissions || [],
        error: null,
      };
    case FETCH_MOU_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_REQUIRED_DOCS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_REQUIRED_DOCS_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: action.payload.documents || [],
        total: action.payload.total || 0,
        documentsRejectedReason: action.payload.documentsRejectedReason || "",
      };
    case FETCH_REQUIRED_DOCS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPLOAD_DOCUMENT_REQUEST:
      return { ...state, loading: true, error: null, };
    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state, loading: false, uploadedDocument: action.payload, // contains id, file path, status
      };
    case UPLOAD_DOCUMENT_FAILURE:
      return {
        ...state, loading: false, error: action.payload,
      };
    case ACCEPT_DOCUMENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case ACCEPT_DOCUMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        documentStatus: action.payload.data?.documentStatus,
      };
    case ACCEPT_DOCUMENTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case REJECT_DOCUMENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case REJECT_DOCUMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        documentStatus: action.payload.data?.documentStatus,
      };
    case REJECT_DOCUMENTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default mouStatusReducer;
