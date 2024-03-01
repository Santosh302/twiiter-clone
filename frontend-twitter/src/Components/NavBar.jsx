
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaTwitter } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout =() => { 
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({type: "LOGIN_ERROR"});
    navigate('/Login')
  }
  return (
    <Navbar expand="md" className="flex-md-column">
      <Navbar.Brand href="#home" style={{ marginTop: '-20px', color: 'skyblue' }}>
        <FaTwitter size="3em" /> {/* Big chat icon as a logo */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-md-column">
          <Nav.Link as={Link} to="/Home">
            <FaHome /> Home
          </Nav.Link>
          <Nav.Link as={Link} to="/Profile">
            <FaUser /> Profile
          </Nav.Link>
          <Nav.Link onClick={logout}>
            <FaSignOutAlt /> Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
