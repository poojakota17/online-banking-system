import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Pool from "../../UserPool";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { saveExtPayee, getExternalPayees } from "../../actions/externalPayeeActions";
import { connect } from "react-redux";
class AddExternalPayee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            externalPayees: [],
            show: true,
            showNewExtPayeeModal: false,
            accountHolderName: "",
            accountNumber: "",
            accountRoutingNumber: ""
        };
    }
    async componentDidMount() {
        const user = Pool.getCurrentUser();
        if (user) {
            let userId = user.getUsername();
            await this.props.getExternalPayees(userId);
            console.log(this.props.externalPayees);
            this.setState({ externalPayees: this.props.externalPayees.externalPayees });
        }
    }
    openModal = () => {
        this.setState({
            showNewExtPayeeModal: true
        });
    };
    closeModal = () => {
        this.setState({ 
            showNewExtPayeeModal: false,
            accountHolderName: "",
            accountNumber: "",
            accountRoutingNumber: ""
         });
    };

    onSubmit = () => {
        this.closeModal();
        const user = Pool.getCurrentUser();
        let userId = user.getUsername();
        let payeeObject = {
            accountHolderName: this.state.accountHolderName,
            accountNumber: this.state.accountNumber,
            accountRoutingNumber: this.state.accountRoutingNumber,
            id: ""
          }

        console.log(userId, payeeObject);
        this.props.saveExtPayee(userId, payeeObject)
    }
    render() {
        return (
            <div>
                <header className="pageHeader">
                    <h5 className="center">A D D &nbsp;&nbsp; E X T E R N A L &nbsp;&nbsp; P A Y E E </h5>
                </header>
                <br />
                <br />
                <Button className="center marginBuffer" variant="secondary" onClick={() => this.openModal()}>Add New External Payee</Button>
                <br />
                <br />
                <hr />
                {this.state.externalPayees.length === 0 ? <h5 className="center">You haven't added any External Payees yet!</h5>
                    :
                    <div className="tableContainer wrapper">
                        <Container>
                            <div className="row">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th> Account Holder Name</th>
                                            <th> Account Number</th>
                                            <th> Routing Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.externalPayees.map((payee) => (
                                            <tr key={payee.id}>
                                                <td> {payee.accountHolderName} </td>
                                                <td> {payee.accountNumber}</td>
                                                <td> {payee.accountRoutingNumber}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Container>
                    </div>

                }

                {this.state.showNewExtPayeeModal && (
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
                                            <Form.Group as={Col} controlId="accountHoldername">
                                                <Form.Label>Account Holder Name</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Name of Account Holder"
                                                    value={this.state.accountHolderName}
                                                    onChange={(event) => this.setState({ accountHolderName: event.target.value })}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="accNum">
                                                <Form.Label>Account Number</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Account Number"
                                                    value={this.state.accountNumber}
                                                    onChange={(event) => this.setState({ accountNumber: event.target.value })}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="routNum">
                                                <Form.Label>Routing Number</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Amount"
                                                    value={this.state.accountRoutingNumber}
                                                    onChange={(event) => this.setState({ accountRoutingNumber: event.target.value })}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Button variant="secondary" type="submit">
                                            Add Payee to your Account
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

function mapStateToProps({ externalPayees }) {
    return { externalPayees };
  }
  export default connect(mapStateToProps, {
    getExternalPayees , saveExtPayee
  })(AddExternalPayee);

