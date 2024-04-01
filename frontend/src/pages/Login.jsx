import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios"; // Import Axios for making HTTP requests
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode JWT tokens

const Login = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hash = await window.crypto.subtle.digest("SHA-256", data);
      const base64Hash = btoa(String.fromCharCode(...new Uint8Array(hash)));
      console.log("Base64 hash:", base64Hash);

      const response = await axios.post(
        "http://127.0.0.1:5050/api/auth/login",
        { identifier, password: base64Hash }
      ); // Make POST request to backend login endpoint
      const { token } = response.data; // Assuming backend sends back a token upon successful login

      // Decoded token brings username, role, iat and exp
      const decodedToken = jwtDecode(token);
      const { username, role, exp } = decodedToken;
      // Verify the token and decode it
      setIsSubmitted(true);
      setError("");
      onLogin(token, username, role, exp); // Call onLogin function to update authentication state
      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username/email or password"); // Handle login error
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-3">
          <div
            className={`card border-primary mt-5 ${
              isSubmitted ? "border-success" : ""
            }`}
          >
            <div className="card-header bg-primary text-white">Log In</div>
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}

                <Button variant="primary" type="submit" className="mt-3">
                  Login
                </Button>
              </Form>
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-md-6 text-center">
                    <p>
                      Don't have an account? <a href="/register">Register</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Login;
