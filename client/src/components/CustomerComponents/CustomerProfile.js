import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Pool from "../../UserPool";
import Container from "react-bootstrap/Container";
import { getUser } from "../../actions/userActions";
import { connect } from "react-redux";
class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dob: "",
      ssn:"",
      address: ""
    };
  }
  async componentDidMount() {
    const user = Pool.getCurrentUser();
    if (user) {
      let userId = user.getUsername();
      await this.props.getUser(userId);
      console.log(this.props.users);
      user.getSession((err, session) => {
        if (!err) {
          console.log(session);
          this.setState({
            firstName: session.getIdToken().payload["custom:firstName"],
            lastName: session.getIdToken().payload["custom:lastName"],
            email: session.getIdToken().payload["email"]
          });
        }
      });
    }
  }
  render() {
    console.log(this.props.users);
    return (
      <div>
        <header className="pageHeader">
          <h5 className="center">P R O F I L E</h5>
        </header>
        <div className="profile-details">
          <Container>
           
            <Form>
              <Form.Row size="sm">
                <Form.Group as={Col} controlId="formfirstname">
                  <Form.Label>First Name</Form.Label>

                  <Form.Control
                    size="sm"
                    type="text"
                    readOnly
                    placeholder={this.state.firstName}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formlastname">
                  <Form.Label>Last Name</Form.Label>

                  <Form.Control
                    size="sm"
                    type="text"
                    readOnly
                    placeholder={this.state.lastName}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formfirstname">
                  <Form.Label>Email</Form.Label>

                  <Form.Control
                    size="sm"
                    type="text"
                    readOnly
                    placeholder={this.state.email}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formlastname">
                  <Form.Label>Phone Number</Form.Label>

                  <Form.Control
                    size="sm"
                    type="text"
                    readOnly
                    placeholder={this.props.users.user.phoneNumber}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formfirstname">
                  <Form.Label>DOB</Form.Label>

                  <Form.Control
                    size="sm"
                    type="text"
                    readOnly
                    placeholder={this.props.users.user.dob}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formlastname">
                  <Form.Label>SSN</Form.Label>

                  <Form.Control
                    size="sm"
                    type="text"
                    readOnly
                    placeholder={this.props.users.user.ssn}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formAddress">
                  <Form.Label>Address </Form.Label>

                  <Form.Control
                    size="sm"
                    type="text"
                    readOnly
                    placeholder={this.props.users.user.address}
                  />
                </Form.Group>
              </Form.Row>
            </Form>
          </Container>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users}) {
  return { users};
}
export default connect(mapStateToProps, {
  getUser
})(CustomerProfile);