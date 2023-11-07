// import React from 'react'
import { useEffect, useState } from 'react';
// import './index.css';
import { Card, Dropdown } from 'react-bootstrap';
import { getBookMarkedIds, getRandomQuote, getTagList } from '../store/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFromApi } from '../api';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [currentTag, setCurrentTag] = useState('');
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch();
  const { quote, tags } = useSelector((state) => state.home)
  const navigate = useNavigate()

//   console.log(quote, "quo")

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

  const selectedTag = (item) => {
    const { name } = item;

    fetchDataFromApi(`/random?tags=${name}`)
    .then(res => {
      // console.log(res, "res")
      dispatch(getRandomQuote(res));
    })
    setCurrentTag(name);
  }

   const bookMarkId = (id) => {
    setChecked(true);
    dispatch(getBookMarkedIds(id))
   }

  useEffect(() => {
    fetchApiData();
    tagList();
  }, [])

  return (
    <div className='box'>
      <div className="mynav">
        <div><h6 onClick={() => navigate("/")}>Home</h6></div>
        <div><h6 onClick={() => navigate("/bookmarks")}>Bookmarks</h6></div>
      </div>
      
      <div className="content">
        <Card style={{ padding: '0 50px' }}>
          <Card.Body>
            
            <Card.Text>{quote?.content}</Card.Text>
            <div className='sub_body'>
                <p>{quote?.author}</p>
                {!checked ? (
                <i className="bi bi-bookmark" onClick={() => bookMarkId(quote?._id)}></i>
                ) : (
                <i className="bi bi-bookmark-fill"></i>
                )}
            </div>
          </Card.Body>
        </Card>

        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            {currentTag}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {tags?.map((item, idx) => (
                <Dropdown.Item 
                  href="#" 
                  key={idx}
                  onClick={() => selectedTag(item)}
                >
                  {item.name}
                </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <div>
          <button className='bg bg-success mybtn' onClick={fetchApiData}>Next Quote</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage