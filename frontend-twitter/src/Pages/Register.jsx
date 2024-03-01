import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import { FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom for navigation


const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;  
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
  
    try {
      await axios.post("http://localhost:5000/signup", {
        fullName,
        email,
        password,
      });
  
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: 'User successfully registered'
      });
  
      // Clear form fields after successful submission

      setFullName("");
      setEmail("");
      setPassword("");
      navigate("/Login"); // Redirect to the desired page
    } catch (error) {
      setLoading(false);
      console.error(error);
  
      if (error.response && error.response.status === 409) {

        // HTTP status 409 indicates a conflict, meaning the user is already registered

        Swal.fire({
          icon: "error",
          title: 'User already registered',
          text: 'Please use a different email or login if you already have an account.'
        });
      } else {

        // Handle other errors

        Swal.fire({
          icon: "error",
          title: 'Some error occurred. Please try again later!'
        });
      }
    }
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
              <span className="font-monospace fs-1">Let's make a tweet</span>
              <br />
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

              <h2 className="text-center mb-4">Register</h2>

              {/* Registration Form */}
              <Form onSubmit={handleSubmit}>

                {/* Full Name Input */}
                <Form.Group className="mb-3" controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Email Input */}
                
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
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
                    required
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  {/* Register Button */}
                  <Button
                    style={{ backgroundColor: "#3bcaeb", border: "none" }}
                    type="submit"
                    className="w-100 mb-3"
                  >
                    Register
                  </Button>
                </div>
              </Form>

              {/* Text with Login Link */}
              <p className="text-center">
                Already have an account? <Link to="/Login">Login</Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
