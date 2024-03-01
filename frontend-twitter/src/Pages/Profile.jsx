import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import './Home.css';
import { FaCalendar, FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
import { Card } from 'react-bootstrap';
import EditProfile from '../Components/editProfile';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Profile = () => {
  
  const [show, setShow] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.userReducer);
  
  
  const CONFIG_OBJ = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/MyallPosts', CONFIG_OBJ);
        if (response.status === 200) {
          setMyPosts(response.data.posts);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Some error occurred while getting all your posts',
          });
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
    
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={3} sm={3} md={3} lg={3} className='navigation-column'>
          <NavBar />
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className='container-fluid mb-4'>
        
            <div >
              <div className='d-flex'>
                <div>
                  <p className='fw-bold fs-6'>←</p>
                </div>
                <div className='' style={{ marginLeft: '20px' }}>
                  <h5>{user.fullName}</h5>
                  <p className='fw-bold' style={{ paddingTop: '-20px', fontSize: '12px' }}>
                    {} Tweets
                  </p>
                </div>
              </div>
              <div className='border-bottom'>
                <div
                  className='profile-picture-container'
                  style={{
                    backgroundImage: `url('https://source.unsplash.com/300x201/?nature')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: 'auto',
                    height: '150px',
                  }}
                >
                  <Image src='' roundedCircle style={{ marginLeft: '10px', marginTop: '60px', width: '120px', height: '120px' }} />
                </div>
                <div className='d-flex w-25 ms-auto mt-2'>
                  <Button type="button" className='btn btn-primary ms-auto' onClick={handleShow}>
                    Edit Profile
                  </Button>
                </div>
                <div style={{ marginLeft: '0px', marginTop: '-1rem' }}>
                  <p className='fw-bold fs-5'>{user.fullName}</p>
                  <p className='' style={{ marginTop: '-20px', fontSize: '13px' }}>
                    @{user.fullName}
                  </p>
                  <p>{user.bio}</p>
                  <div className='d-flex'>
                    <FaCalendar />
                    <p style={{ marginLeft: '5px', color: 'grey', fontSize: '13px' }}>
                      Joined 1 Jan 2024
                    </p>
                  </div>
                </div>
              </div>
              <div className='mt-4'>
                <ul className='nav nav-pills mb-3 d-flex justify-content-evenly border-bottom' id='pills-tab' role='tablist'>
                  <li className='nav-item' role='presentation'>
                    <button className='nav-link active' id='pills-home-tab' data-bs-toggle='pill' data-bs-target='#pills-home' type='button' role='tab' aria-controls='pills-home' aria-selected='true'>
                      Tweets
                    </button>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <button className='nav-link' id='pills-profile-tab' data-bs-toggle='pill' data-bs-target='#pills-profile' type='button' role='tab' aria-controls='pills-profile' aria-selected='false'>
                      Media
                    </button>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <button className='nav-link' id='pills-contact-tab' data-bs-toggle='pill' data-bs-target='#pills-contact' type='button' role='tab' aria-controls='pills-contact' aria-selected='false'>
                      Likes
                    </button>
                  </li>
                </ul>
                  {myPosts.map((post) => (
                <div className='tab-content' id='pills-tabContent'>
                  <div className='tab-pane fade show active' id='pills-home' role='tabpanel' aria-labelledby='pills-home-tab'>
                    <Card key={post._id} className='mb-3'>
                      <Card.Body>
                        <div className='d-flex'>
                          <Image src={post.author.image} roundedCircle style={{ width: '50px', height: '50px' }} />
                          <div style={{ marginLeft: '10px' }}>
                            <Card.Title>
                              {post.author.fullName}
                              <span style={{ fontSize: '12px', fontWeight: 'normal', color: 'grey', marginLeft: '5px' }}>. 1 Jan 2024</span>
                              <p style={{ fontSize: '14px', fontWeight: 'normal' }}>@{post.author.fullName}</p>
                            </Card.Title>
                          </div>
                        </div>
                        <Card.Text>{post.description}</Card.Text>
                        {post.image && <Card.Img variant='top' src={post.image} />}
                        <div className='post-icons mt-4'>
                          <p>
                            <FaThumbsUp /> {0} Likes
                          </p>
                          <p>
                            <FaComment /> {0} Comments
                          </p>
                          <p>
                            <FaShare /> {0} Shares
                          </p>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='tab-pane fade' id='pills-profile' role='tabpanel' aria-labelledby='pills-profile-tab'>
                    ..ss.
                  </div>
                  <div className='tab-pane fade' id='pills-contact' role='tabpanel' aria-labelledby='pills-contact-tab'>
                    .tt..
                  </div>
                </div>
              ))}
              </div>
            </div>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3}></Col>
      </Row>
      <EditProfile show={show} handleClose={handleClose} />
    </Container>
  );
};

export default Profile;
