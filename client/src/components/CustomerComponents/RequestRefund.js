import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Pool from "../../UserPool";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { saveRequest ,getRequests} from "../../actions/refundActions";
import { connect } from "react-redux";
import { getAccounts } from '../../actions/accountActions';
class RequestRefund extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refundrequests: [],
            show: true,
            showNewRequestModal: false,
            firstName: "",
            lastName: "",
            accountNumber: "",
            amount: "",
            reason: "",
            accounts:[
                {accountNumber:12111111111111212},
                {accountNumber:12111111111111132},
                {accountNumber:56564444444444444}
            ]
        };
    }
    async componentDidMount() {
        
        const user = Pool.getCurrentUser();
        if (user) {
            let userId = user.getUsername();
            await this.props.getRequests(userId);
            console.log(this.props.refundRequests);
            this.setState({ refundrequests: this.props.refundRequests.refundRequests });
            await this.props.getAccounts(userId);
            console.log(this.props.accounts);
            this.setState({ accounts: this.props.accounts.accounts });
            user.getSession((err, session) => {
                if (!err) {
                    console.log(session);
                    this.setState({
                        firstName: session.getIdToken().payload["custom:firstName"],
                        lastName: session.getIdToken().payload["custom:lastName"]
                    });
                }
            });
        }

    }
    handleChange = (event) => {
        this.setState({accountNumber: event.target.value});
      }
    openModal = () => {
        this.setState({
            showNewRequestModal: true
        });
    };
    closeModal = () => {
        this.setState({ 
            showNewRequestModal: false,
            accountNumber: "",
            amount: "",
            reason: ""
         });
    };

    onSubmit = () => {
        this.closeModal();
        const user = Pool.getCurrentUser();
        let userId = user.getUsername();
        let requestObject = {
               // customerId:userId,
                accountNumber: this.state.accountNumber,
                amount: this.state.amount,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                reason: this.state.reason,
                status: "OPEN"
        }

        console.log(userId,requestObject);
        this.props.saveRequest(userId,requestObject).then(res=> {
            this.props.history.push("/customerhome");
        })
        
    }
    render() {
        return (
            <div>
                <header className="pageHeader">
                    <h5 className="center">R E Q U E S T &nbsp;&nbsp; R E F U N D </h5>
                </header>
                <br />
                <br />
                <Button className="center marginBuffer" variant="secondary" onClick={() => this.openModal()}>Raise a New Refund Request</Button>
                <br />
                <br />
                <hr />
                {this.state.refundrequests.length === 0 ? <h6 className="center">Y O U &nbsp;&nbsp;H A V E N ' T&nbsp;&nbsp;R A I S E D&nbsp;&nbsp;A N Y &nbsp;&nbsp;R E Q U E S T S &nbsp;&nbsp;Y E T !</h6>
                    :
                    <>
                     <h6 className="center">L I S T &nbsp;&nbsp; OF &nbsp;&nbsp; R E F U N D &nbsp;&nbsp; R E Q U E S T S</h6>
                    <div className="tableContainer wrapper">
                        <Container>
                            <div className="row">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th> Account Number</th>
                                            <th> Amount</th>
                                            <th> Reason</th>
                                            <th> Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.refundrequests.map((request) => (
                                            <tr key={request.requestId}>
                                                <td> {request.accountNumber} </td>
                                                <td> {request.amount}</td>
                                                <td> {request.reason}</td>
                                                <td> {request.status} </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Container>
                    </div>
                 </>
                }

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
                                                <Form.Label>Account Number</Form.Label> 
                                                    <select value="Select Account" onChange={this.handleChange}>
                                                    <option value="">--Select One--</option>
                                                    {this.state.accounts.map((account) => (
                                            <option value={account.accountnumber}>{account.accountNumber}</option>
                                                    ))}
                                                    </select>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter AccountNumber"
                                                    value={this.state.accountNumber}
                                                    onChange={(event) => this.setState({ accountNumber: event.target.value })}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formamount">
                                                <Form.Label>Amount</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Amount"
                                                    value={this.state.amount}
                                                    onChange={(event) => this.setState({ amount: event.target.value })}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="REASON">
                                                <Form.Label>Reason</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={this.state.reason}
                                                    onChange={(event) => this.setState({ reason: event.target.value })} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Button variant="primary" type="submit">
                                            Raise Request
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

function mapStateToProps({ accounts , refundRequests }) {
    return { accounts, refundRequests};
  }

  export default connect(mapStateToProps, {
    getAccounts,getRequests,saveRequest
  })(RequestRefund);
