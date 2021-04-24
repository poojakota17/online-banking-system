import React, { Component } from 'react';
import { getUser } from "../../actions/userActions";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {saveAccount} from "../../actions/accountActions";
import Jumbotron from 'react-bootstrap/Jumbotron'
class AddNewAccount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            customer: {},
            selectedOption: "",
            firstName: "",
            lastName: "",
            accountBalance: "",
            accountRoutingNumber: ""
        }
    }

    back() {
        this.props.history.goBack();
    }
    onValueChange = (event) => {
        this.setState({
            selectedOption: event.target.value
        });

    }

    onSubmit = (e) => {
         e.preventDefault();
        let accountObject = {
               // customerId:userId,
            accountBalance: this.state.accountBalance,
            accountRoutingNumber: this.state.accountRoutingNumber,
            accountType:this.state.selectedOption
        }

        console.log(accountObject);
        this.props.saveAccount(this.state.id, accountObject).then(res=> {
            this.props.history.push("/bankerhome");
        })
     /*   this.props.saveRequest(requestObject).then(res=> {
            this.props.history.push("/customerhome");
        })
        */
    }
    saveAccount = () => {
        let accountObject = {
            // customerId:userId,
         accountBalance: this.state.accountBalance,
         accountRoutingNumber: this.state.accountRoutingNumber,
         accountType:this.state.selectedOption
     }

     console.log(accountObject);
     this.props.saveAccount(this.state.id, accountObject).then(res=> {
        this.props.history.push("/bankerhome");
    })
    }

    async componentDidMount() {
        console.log(this.state.id);
        await this.props.getUser(this.state.id);
        this.setState({
            customer: this.props.users.user
        })
    }

    render() {
        return (
            <div>
                <header className="pageHeader">
                    <h5 className="center">R E G I S T E R  &nbsp;&nbsp; N E W  &nbsp;&nbsp;B A N K &nbsp;&nbsp;A C C O U N T</h5>
                </header>
                <br></br>
                <Button className="center marginBuffer" variant="secondary" onClick={() => this.back()}> Back to Customers List</Button>
                <br />
                <br />
                <Container>
                <Jumbotron className="marginBuffer">
                    <Form >
                        <Form.Row size="sm">
                            <Form.Group as={Col} controlId="formfirstname">
                                <Form.Label>First Name</Form.Label>

                                <Form.Control
                                    size="sm"
                                    type="text"
                                    readOnly
                                    placeholder={this.state.customer.firstName}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formlastname">
                                <Form.Label>Last Name</Form.Label>

                                <Form.Control
                                    size="sm"
                                    type="text"
                                    readOnly
                                    placeholder={this.state.customer.lastName}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formfirstname">
                                <Form.Label>Account Balance</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Enter Account Balance"
                                    value={this.state.accountBalance}
                                    onChange={(event) => this.setState({ accountBalance: event.target.value })}
                                />
                            </Form.Group>
                        </Form.Row>
                        <div className="radio">
                            <label>{" "}
                                <input
                                    type="radio"
                                    value="CHECKINGSACCOUNT"
                                    checked={this.state.selectedOption === "CHECKINGSACCOUNT"}
                                    onChange={this.onValueChange}
                                />{" "}
            &nbsp;&nbsp;C H E C K I N G S   &nbsp;&nbsp; A C C O U N T
          </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    value="SAVINGSACCOUNT"
                                    checked={this.state.selectedOption === "SAVINGSACCOUNT"}
                                    onChange={this.onValueChange}
                                />{" "}
                                 &nbsp;&nbsp;S A V I N G S  &nbsp;&nbsp; A C C O U N T
                            </label>
                        </div>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formfirstname">
                                <Form.Label>Account Routing Number</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Account Routing Number"
                                    value={this.state.accountRoutingNumber}
                                    onChange={(event) => this.setState({ accountRoutingNumber: event.target.value })}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                        <Button className="marginBuffer" variant="secondary" type="submit" onClick={()=>{this.saveAccount()}}>
                            Start Account
                        </Button>
                    </Jumbotron>
                </Container>
               
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return { users };
}
export default connect(mapStateToProps, {
    getUser,saveAccount
})(AddNewAccount);
