import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Pool from "../../UserPool";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { getAccounts } from '../../actions/accountActions';
import { getExternalPayees } from "../../actions/externalPayeeActions";
import { saveExternalReccurTxn, saveReccurTxn, saveOneTimeTxn, saveExternalOneTimeTxn } from "../../actions/transactionActions";
import { connect } from "react-redux";

class NewTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
        show: true,
        showNewRequestModal: false,
        toAccountNumber: "",
        transaction:"",
        frequency:"",
        operationsType:"",
        txnAmount: "",
        memo:"",
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
  this.setState({accountId: event.target.value});
}

handleChangeExternal = (event) => {
  this.setState({accountId: event.target.value});
}

handleChangeTransactionType = (event) => {
  this.setState({frequency: event.target.value});
}

handleChangeOperationType = (event) => {
  this.setState({operationsType: event.target.value});
}

handleChangeTransactionTypeExternal = (event) => {
  this.setState({frequency: event.target.value});
}

handleChangeOperationTypeExternal = (event) => {
  this.setState({operationsType: event.target.value});
}

handleChangeExternalAccount = (event) => {
  this.setState({ toExternalPayeeId: event.target.value });
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
      accountId: "",
      toAccountNumber: "",
      frequency: "",
      operationsType: "",
      txnAmount: "",
      memo: ""
   });
};

closeModalExternal = () => {
  this.setState({ 
      showNewRequestModalExternal: false,
      accountId: "",
      toExternalPayeeId: "",
      frequency: "",
      operationsType: "",
      txnAmount: "",
      memo: ""
   });
};

onSubmit = () => {
  this.closeModal();
  const user = Pool.getCurrentUser();
  let userId = user.getUsername();

  if(this.state.frequency !== "ONE_TIME" && this.state.frequency !== "") {
    let requestReccurTxnObject = {
      toAccountNumber: this.state.toAccountNumber,
      frequency: this.state.frequency,
      operationsType: this.state.operationsType,
      startDate: this.state.startDate,
      txnAmount: this.state.txnAmount,
      memo: this.state.memo
    }

    console.log(requestReccurTxnObject);
    this.props.saveReccurTxn(requestReccurTxnObject,this.state.accountId).then(res=> {
      this.props.history.push("/customerhome");
    })
  }

  else {
    let requestTxnObject = {
      toAccountNumber: this.state.toAccountNumber,
      frequency: this.state.frequency,
      operationsType: this.state.operationsType,
      txnAmount: this.state.txnAmount,
      memo: this.state.memo
    }
  
    console.log(requestTxnObject);
    this.props.saveOneTimeTxn(requestTxnObject,this.state.accountId).then(res=> {
      this.props.history.push("/customerhome");
    })
  }
 
}

saveReccurTxn = () => {
  let requestReccurTxnObject = {
    toAccountNumber: this.state.toAccountNumber,
    frequency: this.state.frequency,
    operationsType: this.state.operationsType,
    startDate: this.state.startDate,
    txnAmount: this.state.txnAmount,
    memo: this.state.memo
  }
}

saveOneTimeTxn = () => {
  let requestTxnObject = {
    toAccountNumber: this.state.toAccountNumber,
    frequency: this.state.frequency,
    operationsType: this.state.operationsType,
    txnAmount: this.state.txnAmount,
    memo: this.state.memo
  }
}

onSubmitExternal = () => {
  this.closeModalExternal();
  const user = Pool.getCurrentUser();
  let userId = user.getUsername();

  if(this.state.frequency !== "ONE_TIME" && this.state.frequency !== "") {
    let requestExtRecurrObject = {
      frequency: this.state.frequency,
      startDate: this.state.startDate,
      operationsType: this.state.operationsType,
      txnAmount: this.state.txnAmount,
      memo: this.state.memo
    }
  
    console.log(requestExtRecurrObject);
    console.log(this.state.accountId);
    this.props.saveExternalReccurTxn(requestExtRecurrObject,this.state.accountId,this.state.toExternalPayeeId).then(res=> {
      this.props.history.push("/customerhome");
    })
  }

  else {
    let requestExtOneTimeObject = {
      frequency: this.state.frequency,
      operationsType: this.state.operationsType,
      txnAmount: this.state.txnAmount,
      memo: this.state.memo
    }
  
    console.log(requestExtOneTimeObject);
    console.log(this.state.accountId);
    this.props.saveExternalOneTimeTxn(requestExtOneTimeObject,this.state.accountId,this.state.toExternalPayeeId).then(res=> {
      this.props.history.push("/customerhome");
    })
  }

}

saveExternalReccurTxn = () => {
  let requestExtRecurrObject = {
    frequency: this.state.frequency,
    startDate: this.state.startDate,
    operationsType: this.state.operationsType,
    txnAmount: this.state.txnAmount,
    memo: this.state.memo
  }
}

saveExternalOneTimeTxn = () => {
  let requestExtOneTimeObject = {
    frequency: this.state.frequency,
    operationsType: this.state.operationsType,
    txnAmount: this.state.txnAmount,
    memo: this.state.memo
  }
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

                          <Form className="marginBuffer" onSubmit={this.onSubmit} >
                                    
                          <div className="form-group">
                          <label> Choose Account Number </label>
                          <select
                            name="category"
                            className="form-control"
                            onChange={this.handleChange}
                          >
                          <option value="">
                              {" "}
                              Please choose an Account{" "}
                          </option>
                          {this.state.accounts.map((account) => {
                          if (this.state.accountId === account.id) {
                             return (
                              <option value={account.id} selected="selected">
                              {account.accountNumber}{" "}
                          </option>
                        );
                      } else {
                        return <option value={account.id}> {account.accountNumber} </option>;
                      }
                    })}
                  </select>
                </div>
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
                                          <option value="ONE_TIME">One-Time</option> 
                                          <option value="DAILY">DAILY</option>
                                          <option value="WEEKLY">WEEKLY</option>
                                          <option value="MONTHLY">MONTHLY</option>
                                          <option value="YEARLY">YEARLY</option>
                                          </select>
                                  <Form.Control
                                      required
                                      type="text"
                                      placeholder="Transaction Type"
                                      value={this.state.frequency}
                                      onChange={(event) => this.setState({ frequency: event.target.value })}
                                />
                              </Form.Group>

                              {this.state.frequency !== "ONE_TIME" && this.state.frequency !== "" ? (
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
                                      value={this.state.operationsType}
                                      onChange={(event) => this.setState({ operationsType: event.target.value })}
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
                                      value={this.state.txnAmount}
                                      onChange={(event) => this.setState({ txnAmount: event.target.value })}
                                />
                              </Form.Group>
                              
                              <Form.Group as={Col} controlId="formmemo">
                                  <Form.Label>Memo</Form.Label>
                                  <Form.Control
                                      type="text"
                                      placeholder="Enter Message"
                                      value={this.state.memo}
                                      onChange={(event) => this.setState({ memo: event.target.value })}
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
                                  
                        <div className="form-group">
                        <label> Choose Account Number </label>
                        <select
                          name="category"
                          className="form-control"
                          onChange={this.handleChangeExternal}
                        >
                        <option value="">
                            {" "}
                            Please choose an Account{" "}
                        </option>
                        {this.state.accounts.map((account) => {
                        if (this.state.accountId === account.id) {
                           return (
                            <option value={account.id} selected="selected">
                            {account.accountNumber}{" "}
                        </option>
                      );
                    } else {
                      return <option value={account.id}> {account.accountNumber} </option>;
                    }
                  })}
                </select>
              </div>
                                
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
                                    if (this.state.toExternalPayeeId === payee.id) {
                                       return (
                                        <option value={payee.id} selected="selected">
                                        {payee.accountHolderName}{" "}
                                    </option>
                                  );
                                } else {
                                  return <option value={payee.id}> {payee.accountHolderName} </option>;
                                }
                              })}
                            </select>
                          </div>
                            <Form.Row>
                              <Form.Group as={Col} controlId="formtransaction">
                                  <Form.Label>Transaction</Form.Label>
                                  <select value="Select Transaction" onChange={this.handleChangeTransactionTypeExternal}>
                                          <option value="">--Select One--</option>
                                          <option value="ONE_TIME">One-Time</option>
                                          <option value="DAILY">DAILY</option>
                                          <option value="WEEKLY">WEEKLY</option>
                                          <option value="MONTHLY">MONTHLY</option>
                                          <option value="YEARLY">YEARLY</option>
                                          </select>
                                  <Form.Control
                                      required
                                      type="text"
                                      placeholder="Transaction Type"
                                      value={this.state.frequency}
                                      onChange={(event) => this.setState({ frequency: event.target.value })}
                                />
                              </Form.Group>

                              {this.state.frequency !== "ONE_TIME" && this.state.frequency !== "" ? (
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
                                      value={this.state.operationsType}
                                      onChange={(event) => this.setState({ operationsType: event.target.value })}
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
                                    value={this.state.txnAmount}
                                    onChange={(event) => this.setState({ txnAmount: event.target.value })}
                              />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formmemo">
                                  <Form.Label>Memo</Form.Label>
                                  <Form.Control
                                      type="text"
                                      placeholder="Enter Message"
                                      value={this.state.memo}
                                      onChange={(event) => this.setState({ memo: event.target.value })}
                                />
                              </Form.Group>
                            </Form.Row>
                            <Button variant="primary" type="submit" onClick>
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
  getAccounts, getExternalPayees, saveExternalReccurTxn, saveReccurTxn, saveOneTimeTxn, saveExternalOneTimeTxn
})(NewTransaction);