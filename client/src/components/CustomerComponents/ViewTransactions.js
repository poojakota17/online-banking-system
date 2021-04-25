import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { getAccounts } from '../../actions/accountActions';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
class NewTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: this.props.match.params.id,
        fromDate:"",
        toDate:""
    };
}

async componentDidMount() {
  console.log(this.state.id);
}
back = () => {
    this.props.history.push("/customerhome/accounts");
}
fetch = () => {
    console.log(this.state);
}

render() {
  return (
    <div>
      <header className="pageHeader">
          <h5 className="center"> V I E W &nbsp;&nbsp; T R A N S A C T I O N S</h5>
        </header>
        <br/>
        <Button size="sm" className="center marginBuffer" variant="secondary" onClick={() => this.back()}> Back to Accounts Dashboard</Button>
  
        <br/>
        <br/>
        <Container>
<Form className=" marginBuffer">
        <Form.Row>
        <Form.Group as={Col} controlId="dob">
                            <Form.Label>F R O M  &nbsp;&nbsp; D A T E</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" 
                            onChange={(event) => this.setState({ fromDate: event.target.value })}/>
                        </Form.Group>
          <Form.Group as={Col} controlId="dob">
                            <Form.Label>T O  &nbsp;&nbsp; D A T E</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" 
                            onChange={(event) => this.setState({ toDate: event.target.value })}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="dob">
                        <Button size="sm" className="center marginBuffer" variant="secondary" onClick={() => this.fetch()}> Fetch Transactions</Button>
                        </Form.Group>
        </Form.Row>
        </Form>
       
     </Container>
    </div>
  );
}
}

function mapStateToProps({ accounts }) {
  return { accounts };
}

export default connect(mapStateToProps, {
  getAccounts
})(NewTransaction);