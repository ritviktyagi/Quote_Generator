import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    quote: {},
    tags: [],
    bookmarkIds: [],
    bookmarkedQuotes: [],
  },
  reducers: {
    getRandomQuote: (state, action) => {
      state.quote = action.payload;
    },

    getTagList: (state, action) => {
      state.tags = action.payload;
    },

    getBookMarkedIds: (state, action) => {
      if(!state.bookmarkIds.includes(action.payload)){
        state.bookmarkIds = [...state.bookmarkIds, action.payload]
        localStorage.setItem("BookmarkedIds", state.bookmarkIds)
    }
  },

  getBookMarkedQuotes: (state, action) => {
    if(!JSON.stringify(state.bookmarkedQuotes).includes(JSON.stringify(action.payload)))
      state.bookmarkedQuotes = [...state.bookmarkedQuotes, action.payload]
  },
}})

// Action creators are generated for each case reducer function
export const { getRandomQuote, getTagList, getBookMarkedIds, getBookMarkedQuotes } = homeSlice.actions

export default homeSlice.reducer