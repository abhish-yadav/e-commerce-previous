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

function SignUp() {
  //useState Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  //useEffect Hooks
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

    console.log(name, email, password);
    let result = await fetch("http://localhost:9003/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    if (result) {
      localStorage.setItem("userDetails", JSON.stringify(result));
      Swal.fire({
        title: `Welcome to our webiste ${name} and thanks for joining us!`,
        icon: "success",
      });
      navigate("/");
    }
  };
  return (
    <div className="container">
      <Card className="card">
        <Form>
          <FormGroup className="mb-3">
            <h3 className="">SignUp</h3>

            {/* Name */}
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Your Name Here"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {error && !name && (
              <span>
                Name is Required!
                <br />
              </span>
            )}
          </FormGroup>
          {/* Email */}
          <FormGroup className="mb-3">
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
                Password is Required!
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
            Submit
          </Button>
          <div className="mt-2" style={{ color: "#84b488" }}>
            Already have an account,
            <Link to="/Login" className="sign-in">
              {" "}
              Click here
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default SignUp;
