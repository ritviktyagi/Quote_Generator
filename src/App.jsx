// import React from 'react'
import { useEffect } from 'react';
import './index.css';
import { getRandomQuote, getTagList } from './store/homeSlice';
import { useDispatch } from 'react-redux';
import { fetchDataFromApi } from './api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import BookMarks from './pages/BookMarks';

const App = () => {
  const dispatch = useDispatch();

  const fetchApiData = () => {
    fetchDataFromApi("/random")
    .then(res => {
      // console.log(res, "res")
      dispatch(getRandomQuote(res));
    })
  }

  const tagList = () => {
    fetchDataFromApi("/tags")
    .then(res => {
      dispatch(getTagList(res));
    })
  }

  useEffect(() => {
    fetchApiData();
    tagList();
  }, [])

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/bookmarks' element={<BookMarks />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App