import { fetchApi } from "../helpers/fetch";
import { types } from "../types/types";
const prefix = 'posts';

export const postsGetAll = (page = 1, limit = 10, search = '') => { 
  return async(dispatch) => {
    try {
      dispatch( postsLoadingAll() );
      const filter = search ? `&filter=${JSON.stringify({ search})}`  : '';
      const res = await fetchApi(`${prefix}?page=${page}&limit=${limit}${filter}`, {}, 'GET',);
      const body = await res.json();
      dispatch( postsLoaded( body ) );
    } catch (error) {
      console.log(error);
    }
  };
};

export const createOrUpdatePost = (data, isAddForm = true) => {
  return async(dispatch, getState) => {
    try {
      dispatch(loadingCreateOrUpdated())
      const url = isAddForm ? `${prefix}` : `${prefix}/${data.id}`;
      const method = isAddForm ? 'POST' : 'PUT';
      await fetchApi(url, data, method);
      dispatch(createdOrUpdatedPost());

      const {  _meta } = getState().post;
      dispatch(postsGetAll(_meta.page_number, _meta.page_size));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePost = (id) => {
  return async(dispatch, getState) => {
    try {
      dispatch(loadingCreateOrUpdated())
      await fetchApi(`${prefix}/${id}`, {}, 'DELETE');
      dispatch(createdOrUpdatedPost());

      const {  _meta } = getState().post;
      dispatch(postsGetAll(_meta.page_number, _meta.page_size));
    } catch (error) {
      console.log(error);
    }
  }
};

export const openOrCloseDetails = (post = {}) => ({
  type: types.openCloseDetails,
  payload: post,
});

export const openOrCloseAddOrEdit = (type = 'Add', post = {}) => ({
  type: types.openCloseAddOrEdit,
  payload: {
    type,
    post
  }
});

const postsLoadingAll = () => ({
  type: types.postsLoadingAll
})

const postsLoaded = (events) => ({
  type: types.postsLoaded,
  payload: events
})

export const loadingCreateOrUpdated = () => ({
  type: types.loadingCreateOrUpdated
});

export const createdOrUpdatedPost = () => ({
  type: types.createdOrUpdatedPost
});