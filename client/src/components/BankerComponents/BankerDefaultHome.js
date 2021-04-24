import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import Fade from "react-reveal/Fade";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class BankerDefaultHome extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <header className="pageHeader">
          <h5 className="center">H O M E &nbsp;P A G E</h5>
        </header>
        <Container>
        <div className="homePageCardColumn">
          <Fade bottom cascade>
            <CardColumns>
              <Card>
                <Card.Body>
                  <Card.Title>Customer Services</Card.Title>
                  <Card.Text>
                    Serve your Customer!{" "}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/bankerhome/addcustomer" className="navbar-logo">
                    <Button variant="outline-secondary">Services</Button>

                  </Link>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Process Refund</Card.Title>
                  <Card.Text>
                    Process a Refund Request!

                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link
                    to="/bankerhome/processrefunds"
                    className="navbar-logo"
                  >
                    <Button variant="outline-secondary">Process Refund</Button>

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

export default BankerDefaultHome;