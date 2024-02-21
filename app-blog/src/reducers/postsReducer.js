import { types } from "../types/types";

const initialState = {
  isOpenDetails: false,
  isOpenAddOrEdit: false,
  loadingCreateOrUpdated: false,
  typeForm: 'Add',
  selectedPost: {},
  limit: 10,
  posts: [],
  loading: false,
  hasErrors: false,
  _meta: {
    page_size: 10,
    page_number: 1,
    total_elements: 1,
    total_pages: 1,
  }
};
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.postsLoadingAll:
      return { ...state, loading: true, hasErrors: false };
    case types.postsLoaded:
      return {
        ...state,
        posts: action.payload.data,
        _meta: action.payload._meta,
        loading: false,
        hasErrors: false
      };
    case types.openCloseDetails:
      return { ...state, isOpenDetails: !state.isOpenDetails, selectedPost: action.payload };
    case types.openCloseAddOrEdit:
      return { ...state, isOpenAddOrEdit: !state.isOpenAddOrEdit, typeForm: action.payload.type, selectedPost: action.payload.post};
    case types.createdOrUpdatedPost:
      return { ...state, isOpenAddOrEdit: false, loadingCreateOrUpdated: false };
    case types.loadingCreateOrUpdated:
      return { ...state, loadingCreateOrUpdated: true };
    default:
      return state;
  }
};