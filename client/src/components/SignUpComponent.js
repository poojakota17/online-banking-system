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
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [ssn, setSsn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
        setAddress("");
        setDob("");
        setSsn("");
        setPhoneNumber("");
        console.log(data);


        if (props.groupname === "CustomerGroup") {
          let user = {
          
            id: data.userSub,
            address : address,
            customerType : "CUSTOMER",
            dob : dob,
            email : email,
            firstName: firstname,
            lastName: lastname,
            phoneNumber: phoneNumber,
            ssn: ssn
          }
        props.saveUser(user);
        props.closeRegistrationModal();
        } else if (props.groupname === "BankerGroup") {
          let user = {
          
            id: data.userSub,
            address : address,
            customerType : "BANKER",
            dob : dob,
            email : email,
            firstName: firstname,
            lastName: lastname,
            phoneNumber: phoneNumber,
            ssn: ssn
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

      {props.groupname === "CustomerGroup" ? (
        <>
        <Form.Row>
          <Form.Group as={Col} controlId="formfirstname">
            <Form.Label>DOB</Form.Label>

            <Form.Control
              required
              type="text"
              placeholder="YYYY-MM-DD"
              value={dob}
              onChange={(event) => setDob(event.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formlastname">
            <Form.Label>SSN</Form.Label>

            <Form.Control
              required
              type="text"
              placeholder="Enter SSN"
              value={ssn}
              onChange={(event) => setSsn(event.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>

            <Form.Control
              required
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formAddress">
            <Form.Label>Address </Form.Label>

            <Form.Control
              required
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Form.Group>
        </Form.Row>
        </>) : null}


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
        <Button variant="secondary" type="submit">
          Submit
        </Button>
       <br />
          {
            props.groupname === "CustomerGroup" ? (
              <Alert size="sm" show={shows} variant="dark">
              Customer Registration Successful!
              </Alert>
            ):(
              <Alert size="sm" show={shows} variant="dark">
              Sign Up Successful!
              </Alert>
            )
          }
          
       
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
