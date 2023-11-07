// import React from 'react'
import { useEffect } from 'react';
// import './index.css';
import { Card } from 'react-bootstrap';
import { getBookMarkedIds, getBookMarkedQuotes } from '../store/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFromApi } from '../api';
import { useNavigate } from 'react-router-dom';

const BookMarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookmarkIds, bookmarkedQuotes } = useSelector((state) => state.home)

//   console.log(bookmarkedQuotes, "bookqu")
//   console.log(bookmarkIds, "id")

  const fetchApiData = () => {
    bookmarkIds?.forEach((id) => {
        fetchDataFromApi("/quotes/" + id)
        .then(res => {
        // console.log(res, "res")
        dispatch(getBookMarkedQuotes(res));
        })
    })
  }

  const fetchBookmarkedIds = () => {
    const storedIds = localStorage.getItem("BookmarkedIds")
    const newArr = storedIds.split(",");
    newArr.forEach(id => {
        dispatch(getBookMarkedIds(id))
    })
  }


  useEffect(() => {
    fetchBookmarkedIds();
    fetchApiData();
  }, [bookmarkIds])

  return (
    <div className='box'>
      <div className="mynav">
        <div><h6 onClick={() => navigate("/")}>Home</h6></div>
        <div><h6 onClick={() => navigate("/")}>Bookmarks</h6></div>
      </div>
      
      <div className="content">
        {bookmarkedQuotes?.map((item) => {
            return (
                <Card style={{ padding: '0 50px' }} key={item._id}>
                    <Card.Body>
                        <Card.Text>{item.content}</Card.Text>
                        <div className='sub_body'>
                            <p>{item.author}</p>
                            {/* <i className="bi bi-bookmark" onClick={() => bookMarkId(quote?._id)}></i> */}
                        </div>
                    </Card.Body>
                </Card>
            )
        })}
      </div>
    </div>
  )
}

export default BookMarks