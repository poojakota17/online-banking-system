import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import SignUpComponent from '../SignUpComponent';
//import { saveExtPayee, getExternalPayees } from "../../actions/externalPayeeActions";
//import { connect } from "react-redux";
class CustomerServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            showNewCustomerModal: false
        };
    }

    openModal = () => {
        this.setState({
            showNewCustomerModal: true
        });
    };
    closeModal = () => {
        this.setState({ 
            showNewCustomerModal: false
         });
         this.props.history.push("/bankerhome");
    };

    render() {
        return (
            <div>
                <header className="pageHeader">
                    <h5 className="center">C U S T O M E R  &nbsp;&nbsp; S E R V I C E S</h5>
                </header>
                <br />
                <br />
                <Button className="center marginBuffer" variant="secondary" onClick={() => this.openModal()}>Register New Customer</Button>
                <br />
                <br />
                <hr />
                
                {this.state.customers.length === 0 ? <h6 className="center"> N O&nbsp;&nbsp;R E G I S T E R E D &nbsp;&nbsp;C U S T O M E R S &nbsp;&nbsp;!</h6>
                    :
                    <>
                    <h6 className="center">L I S T &nbsp;&nbsp; OF &nbsp;&nbsp; C U S T O M E R S</h6>
                    <div className="tableContainer wrapper">
                        <Container>
                            <div className="row">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th> Account Holder Name</th>
                                            <th> Account Number</th>
                                            <th> Routing Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.customers.map((payee) => (
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
                </>
                }

                {this.state.showNewCustomerModal && (
                    <Modal size="sm" isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button
                                className="alignRight close-modal"
                                onClick={this.closeModal}
                            >
                                X
              </button>
              <>
            <SignUpComponent groupname="CustomerGroup" />

            </>
                        </Zoom>{" "}
                    </Modal>
                )}
            </div>
        );
    }
}

  export default CustomerServices;

