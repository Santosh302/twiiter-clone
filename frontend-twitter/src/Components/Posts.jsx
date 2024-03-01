import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Image, Button } from 'react-bootstrap';
import CreateTweet from './createTweet'; 
import { FaPen, FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';



const Posts = () => {
  

  const CONFIG_OBJ = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allPosts',CONFIG_OBJ); 
        setPosts(response.data.posts); 
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []); 

  return (
    <Container fluid>
      <div>
        <div>
          <div className='home-title mb-4 '>
            <h2>Home</h2>
            <Button variant="primary" onClick={handleShow} className="float-right">
              <FaPen /> Tweet
            </Button>
          </div>
          {posts.map((post) => (
            <Card key={post._id} className="mb-3 " >
              <Card.Body>
                <div className='d-flex'>
                  <Image src={post.image} roundedCircle style={{ width: '50px', height: '50px' }} />
                  <div style={{ marginLeft: '10px' }}>
                    <Card.Title>
                      {post.author.fullName}<span  style={{fontSize: '12px', fontWeight: 'normal' , color: 'grey', marginLeft:'5px'} }>. Aug 13 2023</span>
                      <p style={{fontSize: '14px', fontWeight: 'normal' }}>@{post.author.fullName }</p>
                    </Card.Title>
                  </div>
                </div>
                <Card.Text>{post.description}</Card.Text>
                {post.image && <Card.Img variant="top" height="350px" src={post.image} />}
                <div className="post-icons mt-4">
                  <p>
                    <FaThumbsUp /> {post.likes.length} Likes
                  </p>
                  <p>
                    <FaComment /> {post.comments.length} Comments
                  </p>
                  <p> 
                    <FaShare /> {'0'} Shares
                  </p>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <CreateTweet show={show} handleClose={handleClose} />
    </Container>
  );
};

export default Posts;
