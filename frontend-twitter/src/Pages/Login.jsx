import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import {useDispatch} from 'react-redux';
import { API_BASE_URL } from '../../src/config'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

 

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    const requestData = { email, password }
    await axios.post(`${API_BASE_URL}/login`, requestData)
        .then((result) => {
          debugger;
            if (result.status === 200) {
                setLoading(false);
                localStorage.setItem("token", result.data.message.token);
                localStorage.setItem('user', JSON.stringify(result.data.message.userInfo));
                dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.message.userInfo});
                console.log('Dispatched LOGIN_SUCCESS action');
                setLoading(false);
                navigate('/Home');
            }
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: error.response.data.error
            })
        })
  };

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center vh-100">
        
        {/* First Column for Image */}
        <Col xs={12} md={6} className="text-center mb-3">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#3bcaeb", height: "100vh" }}
          >
            <p className="text-white">
              <span className="font-monospace fs-1">
                Welcome back to Twitter
              </span><br/>
              <FaTwitter size={"5em"} />
            </p>
          </div>
        </Col>

        {/* Second Column for Input Fields */}
        <Col xs={12} md={6} className="p-5 register-form">
          <div className="d-flex">
            <p
              className="ms-auto"
              style={{ color: "#3bcaeb", border: "none", marginTop: "-30px" }}
            >
              <span className="fs-2 fw-bolder">Twitter</span>
              <FaTwitter size={"3em"} />
            </p>
          </div>

          <div className="card shadow-lg mx-auto mt-4 mb-5 p-4">
            <div className="d-flex flex-column ">
            {loading ? (
                <div className=" d-flex justify-content-center align-items-center">
                  <div className="spinner-border  text-info" role="status">
                    <p className="sr-only"></p>
                  </div>
                </div>
              ) : (
                ""
              )}
              <h2 className="text-center mb-4">Login</h2>

              {/* Login Form */}
              <Form onSubmit={handleSubmit}>
                {/* Email Input */}
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Password Input */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  {/* Login Button */}
                  <Button
                    style={{ backgroundColor: "#3bcaeb", border: "none" }}
                    type="submit"
                    className="w-100 mb-3"
                  >
                    Login
                  </Button>
                </div>
              </Form>

              {/* Text with Register Link */}
              <p className="text-center">
                New to Twitter? <Link to="/Register">Register</Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
