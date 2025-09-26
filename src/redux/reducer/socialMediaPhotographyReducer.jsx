
import {
  FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_REQUEST,
  FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS,
  FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_FAILURE,
  CREATE_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS,
  DELETE_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS,
  FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_BY_ID_SUCCESS,
  RESET_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY,
} from "../actions/socialMediaPhotographyAction";

const initialState = {
  loading: false,
  socialMediaPhotographyList: [],
  socialMediaPhotography: null,   
  error: null,
};

export const socialMediaContentPhotographyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS:
      return { ...state, loading: false, socialMediaPhotographyList: action.payload };

    case FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS:
       const updatedItem = action.payload;
            return {
                ...state,
                loading: false,
                socialMediaPhotographyList: state.socialMediaPhotographyList.some(item => item.id === updatedItem.id)
                    ? state.socialMediaPhotographyList.map(item =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                    : [...state.socialMediaPhotographyList, updatedItem],
            };

    case DELETE_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS:
      return { ...state, socialMediaPhotographyList: state.socialMediaPhotographyList.filter((item) => item.id !== action.payload) };

    case FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_BY_ID_SUCCESS:
      return { ...state, loading: false, socialMediaPhotography: action.payload };

    case RESET_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY:
      return { ...state, socialMediaPhotography: null, socialMediaPhotographyList: [] };

    default:
      return state;
  }
};
