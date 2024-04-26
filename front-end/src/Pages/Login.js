import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  //useState Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  // useEffect Hooks
  useEffect(() => {
    const auth = localStorage.getItem("userDetails");
    if (auth) {
      navigate("/");
    }
  });

  const Submit = async (e) => {
    e.preventDefault();
    //Form Validation
    if (!email || !password) {
      setError(true);
      return false;
    }
    console.log(email, password);
    let result = await fetch("http://localhost:9003/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    if (result.name) {
      localStorage.setItem("userDetails", JSON.stringify(result));
      Swal.fire({
        title: "You are logged in as ",
        text: result.name,
        icon: "success",
      });
      navigate("/");
    } else {
      alert("Enter right credentials");
    }
  };
  return (
    <div className="container">
      <Card className="card">
        <Form>
          <FormGroup className="mb-3">
            <h3 className="">Login</h3>

            {/* Email */}
            <FormLabel>Email address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {error && !email && (
              <span>
                Email is Required!
                <br />
              </span>
            )}
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </FormGroup>

          {/* Password */}
          <FormGroup className="mb-3">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && !password && (
              <span>
                Password is required.
                <br />
              </span>
            )}
          </FormGroup>

          {/* Submit Button    */}
          <Button
            variant="success"
            className="log-btn container"
            type="submit"
            onClick={Submit}
          >
            Login
          </Button>
          <div className="mt-2" style={{ color: "#84b488" }}>
            Don't have an account,
            <Link to="/SignUp" className="sign-in">
              {" "}
              Create here
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
