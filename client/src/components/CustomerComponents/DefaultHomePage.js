import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import Fade from "react-reveal/Fade";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class DefaultHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <header className="pageHeader">
          <h5 className="center">H O M E   {"   "}P A G E</h5>
        </header>
        <Container>
        <div className="homePageCardColumn">
          <Fade bottom cascade>
            <CardColumns>
              <Card>
                <Card.Body>
                  <Card.Title>Accounts</Card.Title>
                  <Card.Text>
                    View your Account Details.{" "}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/customerhome/accounts" className="navbar-logo">
                    <Button variant="outline-secondary">Accounts</Button>
                  </Link>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Add External Payee</Card.Title>
                  <Card.Text>
                    Add External Payee to setup recurring bill payments!
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link
                    to="/customerhome/addexternalpayee"
                    className="navbar-logo"
                  >
                    <Button variant="outline-secondary">Add External Payee</Button>
                  </Link>{" "}
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Profile</Card.Title>
                  <Card.Text>View Your Profile Information!</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/customerhome/myprofile" className="navbar-logo">
                    <Button variant="outline-secondary">View Your Profile</Button>
                  </Link>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Request Refund</Card.Title>
                  <Card.Text>
                    Click here to request for a refund!{" "}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/customerhome/requestrefund" className="navbar-logo">
                    <Button variant="outline-secondary">Request Refund</Button>
                  </Link>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>New Transaction</Card.Title>
                  <Card.Text>
                    Perform a new transaction
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link
                    to="/customerhome/newtransaction"
                    className="navbar-logo"
                  >
                    <Button variant="outline-secondary">New Transaction</Button>
                  </Link>{" "}
                </Card.Footer>
              </Card>
            </CardColumns>
          </Fade>
        </div>
      </Container>
        
      </div>
    );
  }
}

export default DefaultHomePage;