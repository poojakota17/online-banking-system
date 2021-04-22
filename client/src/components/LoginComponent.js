import React, { useState, useContext } from "react";
import { AccountContext } from "../Account";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import SignUpComponent from "./SignUpComponent";
import { Link } from "react-router-dom";
function LoginComponent(props) {
  console.log(props.user);
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useContext(AccountContext);
  const [signup, setSignup] = useState(false);

  const showSignUp = () => {
    setSignup(true);
  };
  const showLogin = () => {
    setSignup(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log("logged in!", data);
        let group = data.accessToken.payload["cognito:groups"][0];
        console.log(data.accessToken.payload["cognito:groups"][0]);
        if (group === "BankerGroup") {
          history.push("/bankerhome");
        } else if (group === "CustomerGroup") {
          history.push("/customerhome");
        }
      })
      .catch((err) => {
        console.error("Failed to login!", err);
      });
  };

  return (
    <div className="loginPage">
      <div className="formTitle">

        <h1>ABC Bank</h1>
      </div>
      {signup ? (
        <div>
          <SignUpComponent groupname={props.user} />
          <Button variant="secondary" size="sm" onClick={showLogin}>
            Back to Login screen
          </Button>{" "}
          <Link to="/" className="navbar-logo">
            <Button variant="secondary" size="sm">
              Back to Home
            </Button>
          </Link>
        </div>
      ) : (
        <div className="loginForm">
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              LOGIN
            </Button>
            <br />
            <br />
            {props.user === "CustomerGroup" ? null :(
            <Button variant="secondary" size="sm" onClick={showSignUp}>
              Sign Up
            </Button>)}
            <Link to="/" className="navbar-logo">
              {" "}<Button variant="secondary" size="sm">
                Back to Home
              </Button>
            </Link>
          </Form>
        </div>
      )}
    </div>
  );
}
export default LoginComponent;