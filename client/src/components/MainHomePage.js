import React from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
export default function MainHomePage() {

  return (
    <div className="mainHome">
     
         <div className="formTitle center">
          <h1 >ABC Bank</h1>
          <h6 >We care for your future!</h6>
          <hr />
      
     </div>
      <Container>
        <div className="middle">
            <CardDeck className="width">
              <Card>
                <div className="center">
                <Card.Img
                  variant="top"
                  className="imagesize center"
                  src="../images/user_icon.png"
                  alt="users"
                />
                </div>
                <Card.Body>
                  <Card.Title>PERSONAL BANKING</Card.Title>
                  <Card.Text>
                    <em className="text-muted">Your account at your fingertips!{" "}</em>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/customerlogin" className="navbar-logo">
                    <Button variant="primary">LOGIN</Button>
                  </Link>
                </Card.Footer>
              </Card>
              <Card>
              <div className="center">
                <Card.Img
                  variant="top"
                  className="imagesize"
                  src="../images/banker_icon.jpg"
                  alt="doctors"
                />
                </div>
                <Card.Body>
                  <Card.Title>BANKING SERVICES</Card.Title>
                  <Card.Text>
                    <em className="text-muted">Serve your Customer!{" "}</em>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/bankerlogin" className="navbar-logo">
                    <Button variant="primary">LOGIN</Button>
                  </Link>
                </Card.Footer>
              </Card>
            </CardDeck>
        </div>
      </Container>
    </div>
  );
}