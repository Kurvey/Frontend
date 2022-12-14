import {createSlice} from '@reduxjs/toolkit';
const axios = require('axios');

const initialState = {
  searchKeyword: '',
  searchResults : []
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers : {
    changeSearchKeyword : (state, action) => {
      // console.log('action:', action)
      state.searchKeyword = action.payload
    },

    getSearchResults : (state, action) => {
      // console.log('action:', action)
      state.searchResults = action.payload.data
    }
  }
});

export const getSearchResultAsync = keyword => async dispatch => {
  try {
    const response = await axios.get('/api/v1/product/search/'+ keyword);
    console.log('response', response)
    dispatch(getSearchResults(response.data))
  } catch (err) {
    console.log(err)
  }
};

export const {changeSearchKeyword, getSearchResults} = searchSlice.actions;
export const searchKeywordSelector = state => state.search.searchKeyword;
export const searchResultsSelector = state => state.search.searchResults;
export default searchSlice.reducer;