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
import { getExternalPayees } from "../../actions/externalPayeeActions";

class NewTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
        show: true,
        showNewRequestModal: false,
        fromAccountNumber: "",
        toAccountNumber: "",
        transaction:"",
        transactionType:"",
        amount: "",
        accounts:[
            {fromAccountNumber:12111111111111212},
            {fromAccountNumber:12111111111111132},
            {fromAccountNumber:56564444444444444}
        ],
        externalPayees:[
        ]
    };
    this.handleChangeExternalAccount = this.handleChangeExternalAccount.bind(
      this
    );
}

async componentDidMount() {
  const user = Pool.getCurrentUser();
  if (user) {
      let userId = user.getUsername();
      await this.props.getAccounts(userId);
      console.log(this.props.accounts);
      this.setState({ accounts: this.props.accounts.accounts });
      await this.props.getExternalPayees(userId);
            console.log(this.props.externalPayees);
            this.setState({ externalPayees: this.props.externalPayees.externalPayees });
  }
}

handleChange = (event) => {
  this.setState({fromAccountNumber: event.target.value});
}

handleChangeExternal = (event) => {
  this.setState({fromAccountNumber: event.target.value});
}

handleChangeTransactionType = (event) => {
  this.setState({transactionType: event.target.value});
}

handleChangeOperationType = (event) => {
  this.setState({operationType: event.target.value});
}

handleChangeTransactionTypeExternal = (event) => {
  this.setState({transactionType: event.target.value});
}

handleChangeOperationTypeExternal = (event) => {
  this.setState({operationType: event.target.value});
}

handleChangeExternalAccount = (event) => {
  this.setState({ toAccountNumber: event.target.value });
};

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
      transactionType: "",
      operationType: "",
      amount: ""
   });
};

closeModalExternal = () => {
  this.setState({ 
      showNewRequestModalExternal: false,
      fromAccountNumber: "",
      toAccountNumber: "",
      transactionType: "",
      operationType: "",
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
    transactionType: this.state.transactionType,
    operationType: this.state.operationType,
    startDate: this.state.startDate,
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
    transactionType: this.state.transactionType,
    startDate: this.state.startDate,
    operationType: this.state.operationType,
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
                              <Form.Group as={Col} controlId="formtransactiontype">
                                  <Form.Label>Transaction Type</Form.Label>
                                  <select value="Select Transaction Type" onChange={this.handleChangeTransactionType}>
                                          <option value="">--Select One--</option>
                                          <option value="ONE-TIME">One-Time</option> 
                                          <option value="DAILY">DAILY</option>
                                          <option value="WEEKLY">WEEKLY</option>
                                          <option value="MONTHLY">MONTHLY</option>
                                          <option value="YEARLY">YEARLY</option>
                                          </select>
                                  <Form.Control
                                      required
                                      type="text"
                                      placeholder="Transaction Type"
                                      value={this.state.transactionType}
                                      onChange={(event) => this.setState({ transactionType: event.target.value })}
                                />
                              </Form.Group>

                              {this.state.transactionType !== "ONE-TIME" && this.state.transactionType !== "" ? (
                                <>
                                <Form.Row>
                                  <Form.Group as={Col} controlId="formstartdate">
                                    <Form.Label>Start Date</Form.Label>
                        
                                    <Form.Control
                                      required
                                      type="text"
                                      placeholder="YYYY-MM-DD"
                                      value={this.state.startDate}
                                      onChange={(event) => this.setState({ startDate: event.target.value })}
                                    />
                                  </Form.Group>
                                </Form.Row>
                                </>) : null}
                              
                              <Form.Group as={Col} controlId="formoperationyype">
                                  <Form.Label>Operation Type</Form.Label>
                                  <select value="Select Operation Type" onChange={this.handleChangeOperationType}>
                                      <option value="">--Select One--</option>
                                      <option value="CHEQUE">CHEQUE</option>
                                      <option value="INTRA_BANK">INTRA-BANK</option>
                                      <option value="INTER_BANK">INTER-BANK</option>
                                      <option value="WIRE">WIRE</option>
                                          </select>
                                  <Form.Control
                                      required
                                      type="text"
                                      placeholder="Operation Type"
                                      value={this.state.operationType}
                                      onChange={(event) => this.setState({ operationType: event.target.value })}
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
                                
                                <div className="form-group">
                                    <label> Choose Account Holder </label>
                                    <select
                                      name="category"
                                      className="form-control"
                                      onChange={this.handleChangeExternalAccount}
                                    >
                                    <option value="">
                                        {" "}
                                        Please choose an Account{" "}
                                    </option>
                                {this.state.externalPayees.map((payee) => {
                                    if (this.state.toAccountNumber === payee.accountNumber) {
                                       return (
                                        <option value={payee.accountNumber} selected="selected">
                                        {payee.accountHolderName}{" "}
                                    </option>
                                  );
                                } else {
                                  return <option value={payee.accountNumber}> {payee.accountHolderName} </option>;
                                }
                              })}
                            </select>
                          </div>

                            <Form.Row>
                            <Form.Group as={Col} controlId="formtoaccount">
                                                <Form.Label>Account Number</Form.Label> 
                                                   
                                                <Form.Control
                                                    required
                                                    readOnly
                                                    type="text"
                                                    value={this.state.toAccountNumber}
                                                    
                                                />
                                            </Form.Group>
                            </Form.Row>
                            <Form.Row>
                              <Form.Group as={Col} controlId="formtransaction">
                                  <Form.Label>Transaction</Form.Label>
                                  <select value="Select Transaction" onChange={this.handleChangeTransactionTypeExternal}>
                                          <option value="">--Select One--</option>
                                          <option value="ONE-TIME">One-Time</option>
                                          <option value="DAILY">DAILY</option>
                                          <option value="WEEKLY">WEEKLY</option>
                                          <option value="MONTHLY">MONTHLY</option>
                                          <option value="YEARLY">YEARLY</option>
                                          </select>
                                  <Form.Control
                                      required
                                      type="text"
                                      placeholder="Transaction Type"
                                      value={this.state.transactionType}
                                      onChange={(event) => this.setState({ transactionType: event.target.value })}
                                />
                              </Form.Group>

                              {this.state.transactionType !== "ONE-TIME" && this.state.transactionType !== "" ? (
                                <>
                                <Form.Row>
                                  <Form.Group as={Col} controlId="formstartdate">
                                    <Form.Label>Start Date</Form.Label>
                        
                                    <Form.Control
                                      required
                                      type="text"
                                      placeholder="YYYY-MM-DD"
                                      value={this.state.startDate}
                                      onChange={(event) => this.setState({ startDate: event.target.value })}
                                    />
                                  </Form.Group>
                                </Form.Row>
                                </>) : null}
                              
                              <Form.Group as={Col} controlId="formoperationtype">
                                  <Form.Label>Operation Type</Form.Label>
                                  <select value="Select Operation Type" onChange={this.handleChangeOperationTypeExternal}>
                                      <option value="">--Select One--</option>
                                      <option value="CHEQUE">CHEQUE</option>
                                      <option value="INTRA_BANK">INTRA-BANK</option>
                                      <option value="INTER_BANK">INTER-BANK</option>
                                      <option value="WIRE">WIRE</option>
                                          </select>
                                  <Form.Control
                                      required
                                      type="text"
                                      placeholder="Operation Type"
                                      value={this.state.operationType}
                                      onChange={(event) => this.setState({ operationType: event.target.value })}
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

function mapStateToProps({ accounts,externalPayees }) {
  return { accounts,externalPayees };
}

export default connect(mapStateToProps, {
  getAccounts, getExternalPayees
})(NewTransaction);