import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Pool from "../../UserPool";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { getAccounts } from '../../actions/accountActions';

class NewTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
        show: true,
        showNewRequestModal: false,
        fromAccountNumber: "",
        toAccountNumber: "",
        amount: "",
        accounts:[
            {fromAccountNumber:12111111111111212},
            {fromAccountNumber:12111111111111132},
            {fromAccountNumber:56564444444444444}
        ]
    };
}

async componentDidMount() {
  const user = Pool.getCurrentUser();
  if (user) {
      let userId = user.getUsername();
      await this.props.getAccounts(userId);
      console.log(this.props.accounts);
      this.setState({ accounts: this.props.accounts.accounts });
  }
}

handleChange = (event) => {
  this.setState({fromAccountNumber: event.target.value});
}

handleChangeExternal = (event) => {
  this.setState({fromAccountNumber: event.target.value});
}

  openModal = () => {
    this.setState({
        showNewRequestModal: true
    });
};

openModalExternal = () => {
  this.setState({
      showNewRequestModalExternal: true
  });
};

closeModal = () => {
  this.setState({ 
      showNewRequestModal: false,
      fromAccountNumber: "",
      toAccountNumber: "",
      amount: ""
   });
};

closeModalExternal = () => {
  this.setState({ 
      showNewRequestModalExternal: false,
      fromAccountNumber: "",
      toAccountNumber: "",
      amount: ""
   });
};

onSubmit = () => {
  this.closeModal();
  const user = Pool.getCurrentUser();
  let userId = user.getUsername();
  let requestObject = {
    fromAccountNumber: this.state.fromAccountNumber,
    toAccountNumber: this.state.toAccountNumber,
    amount: this.state.amount
  }

  console.log(requestObject);
}

onSubmitExternal = () => {
  this.closeModalExternal();
  const user = Pool.getCurrentUser();
  let userId = user.getUsername();
  let requestObject = {
    fromAccountNumber: this.state.fromAccountNumber,
    toAccountNumber: this.state.toAccountNumber,
    amount: this.state.amount
  }

  console.log(requestObject);
}

render() {
  return (
    <div>
      <header className="pageHeader">
          <h5 className="center">N E W &nbsp;&nbsp; T R A N S A C T I O N </h5>
        </header>
        <br />
        <br />
        <Button className="center marginBuffer" variant="secondary" onClick={() => this.openModal()}>Internal Transaction</Button>
        <br />
        <br />
        <hr />
        <Button className="center marginBuffer" variant="secondary" onClick={() => this.openModalExternal()}>External Transaction</Button>
        <br />
        <br />
        <hr />
        {this.state.showNewRequestModal && (
          <Modal size="sm" isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                  <button
                      className="alignRight close-modal"
                      onClick={this.closeModal}
                  >
                      X
    </button>
                  <div>
                      <Container>

                          <Form className="marginBuffer" onSubmit={this.onSubmit}>
                                    
                              <Form.Row>
                                  <Form.Group as={Col} controlId="formfromaccount">
                                      <Form.Label>From Account Number</Form.Label> 
                                          <select value="Select Account" onChange={this.handleChange}>
                                          <option value="">--Select One--</option>
                                          {this.state.accounts.map((account) => (
                                  <option value={account.accountnumber}>{account.fromAccountNumber}</option>
                                          ))}
                                          </select>
                                      <Form.Control
                                          required
                                          type="number"
                                          placeholder="Enter From AccountNumber"
                                          value={this.state.fromAccountNumber}
                                          onChange={(event) => this.setState({ fromAccountNumber: event.target.value })}
                                      />
                                  </Form.Group>
                                  
                              </Form.Row>
                              <Form.Row>
                              <Form.Group as={Col} controlId="formtoaccount">
                                  <Form.Label>To Account Number</Form.Label>
                                  <Form.Control
                                      required
                                      type="number"
                                      placeholder="Enter To AccountNumber"
                                      value={this.state.toAccountNumber}
                                      onChange={(event) => this.setState({ toAccountNumber: event.target.value })}
                                />
                              </Form.Group>
                              </Form.Row>
                              <Form.Row>
                              <Form.Group as={Col} controlId="formamount">
                                  <Form.Label>Amount</Form.Label>
                                  <Form.Control
                                      required
                                      type="number"
                                      placeholder="Enter Amount"
                                      value={this.state.amount}
                                      onChange={(event) => this.setState({ amount: event.target.value })}
                                />
                              </Form.Group>
                              </Form.Row>
                              <Button variant="primary" type="submit">
                                  Transaction
                              </Button>
                          </Form>
                      </Container>
                  </div>
              </Zoom>{" "}
          </Modal>
      )}
      {this.state.showNewRequestModalExternal && (
        <Modal size="sm" isOpen={true} onRequestClose={this.closeModalExternal}>
            <Zoom>
                <button
                    className="alignRight close-modal"
                    onClick={this.closeModalExternal}
                >
                    X
  </button>
                <div>
                    <Container>

                        <Form className="marginBuffer" onSubmit={this.onSubmitExternal}>
                                  
                            <Form.Row>
                                <Form.Group as={Col} controlId="formfromaccount">
                                    <Form.Label>From Account Number</Form.Label> 
                                        <select value="Select Account" onChange={this.handleChangeExternal}>
                                        <option value="">--Select One--</option>
                                        {this.state.accounts.map((account) => (
                                <option value={account.accountnumber}>{account.fromAccountNumber}</option>
                                        ))}
                                        </select>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Enter From AccountNumber"
                                        value={this.state.fromAccountNumber}
                                        onChange={(event) => this.setState({ fromAccountNumber: event.target.value })}
                                    />
                                </Form.Group>
                                
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formtoaccount">
                                <Form.Label>To Account Number</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Enter To AccountNumber"
                                    value={this.state.toAccountNumber}
                                    onChange={(event) => this.setState({ toAccountNumber: event.target.value })}
                              />
                            </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formamount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Enter Amount"
                                    value={this.state.amount}
                                    onChange={(event) => this.setState({ amount: event.target.value })}
                              />
                            </Form.Group>
                            </Form.Row>
                            <Button variant="primary" type="submit">
                                Transaction
                            </Button>
                        </Form>
                    </Container>
                </div>
            </Zoom>{" "}
        </Modal>
    )}
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