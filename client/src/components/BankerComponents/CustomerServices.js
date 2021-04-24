import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import SignUpComponent from '../SignUpComponent';
import { getUsers} from "../../actions/userActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class CustomerServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            showNewCustomerModal: false
        };
    }
    async componentDidMount() {

            await this.props.getUsers();
            console.log(this.props.users);
            this.setState({ customers: this.props.users.allUsers });
        
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

    viewCustomerDetails(id){
        this.props.history.push(`/bankerhome/viewcustomer/${id}`);
    }
    viewAccountDetails(id){
        this.props.history.push(`/bankerhome/viewaccounts/${id}`);
    }

    registerAccount(id){
        this.props.history.push(`/bankerhome/registeraccount/${id}`);
    }

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
                                            <th> First Name</th>
                                            <th> Last Name</th>
                                            <th> Phone Number</th>
                                            <th> Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.customers.map((customer) => (
                                            <tr key={customer.id}>
                                                <td> {customer.firstName} </td>
                                                <td> {customer.lastName}</td>
                                                <td> {customer.phoneNumber}</td>
                                                <td>
                                                <Button variant="secondary" size="sm" onClick={() => this.registerAccount(customer.id)}>Register New Account</Button>{" "}
                                                <Button variant="secondary" size="sm" onClick={() => this.viewAccountDetails(customer.id)}>View Existing Accounts</Button>
                                                {" "}<Button variant="secondary" size="sm" onClick={() => this.viewCustomerDetails(customer.id)}>Customer Details</Button>
                                                </td>
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

function mapStateToProps({ users }) {
    return { users };
  }
  export default connect(mapStateToProps, {
    getUsers
  })(CustomerServices);


