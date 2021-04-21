import React, { useEffect, useState } from "react";
import UserPool from "../UserPool";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { saveUser } from "../actions/userActions";

function SignUpComponent(props) {
  console.log(props);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [shows, setShows] = useState(false);

  var dataFirstName = {
    Name: "custom:firstName",
    Value: firstname,
  };

  var dataLastName = {
    Name: "custom:lastName",
    Value: lastname,
  };

  var datagroupName = {
    Name: "custom:groupName",
    Value: props.groupname,
  };

  var attributeList = [];
  var attributeFirstName = new CognitoUserAttribute(dataFirstName);
  var attributeLastName = new CognitoUserAttribute(dataLastName);
  var attributeGroupName = new CognitoUserAttribute(datagroupName);

  attributeList.push(attributeFirstName);
  attributeList.push(attributeLastName);
  attributeList.push(attributeGroupName);

  const onSubmit = (event) => {
    event.preventDefault();
    UserPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        setShows(true);
        setPassword("");
        setEmail("");
        setFirstname("");
        setLastname("");
        console.log(data);


        if (props.groupname === "CustomerGroup") {
          let user = {
          
            id: data.userSub,
            address : "Address",
            customerType : "CUSTOMER",
            dob : "2021-04-20",
            email : email,
            firstName: firstname,
            lastName: lastname,
            phoneNumber: "213213213",
            ssn: "213-987-9876"
          }
        props.saveUser(user);
        } else if (props.groupname === "BankerGroup") {
          let user = {
          
            id: data.userSub,
            address : "Address",
            customerType : "BANKER",
            dob : "2021-04-20",
            email : email,
            firstName: firstname,
            lastName: lastname,
            phoneNumber: "213213213",
            ssn: "213-987-9876"
          }
        props.saveUser(user);
        }
    
        }
      });
  
  };

  return (
    <div className="signupForm">
      <Form onSubmit={onSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formfirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter firstname"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formlastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter lastname"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </Form.Row>
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
          Submit
        </Button>
        <Alert size="sm" show={shows} variant="warning">
          <Alert.Heading>Sign Up Successful!</Alert.Heading>
        </Alert>
      </Form>
    </div>
  );
}


function mapStateToProps({  }) {
  return {  };
}
export default connect(mapStateToProps, {
  saveUser
})(SignUpComponent);
