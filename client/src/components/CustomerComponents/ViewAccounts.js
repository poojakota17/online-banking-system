import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { getAccounts } from '../../actions/accountActions';
import Button from "react-bootstrap/Button";
//import { getTransactions } from "../../actions/transactionActions";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Pool from "../../UserPool";
class ViewAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      show: true,
      activeAccount: null,
      showTransactionsModal: false,
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
  openModal = (account) => {
    //this.props.getTransactions();
   // console.log(this.props.transactions);
    this.setState({
      showTransactionsModal: true,
      activeAccount: account,
    });
  };
  closeModal = () => {
    this.setState({ showTransactionsModal: false });
  };
  render() {
    console.log(this.props.accounts);
    return (
      <div>
        <header className="pageHeader">
          <h5 className="center">A C T I V E &nbsp; A C C O U N T S</h5>
        </header>
        {this.state.accounts.length === 0 ? <h3 className="center">There are no active accounts!</h3>
          :
          <div className="tableContainer wrapper">
          <Container>
            <div className="row">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th> Account Number</th>
                    <th> Opened Date</th>
                    <th> Account Balance</th>
                    <th> Routing Number</th>
                    <th> Account Type</th>
                    <th> Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.accounts.map((account) => (
                     <tr key = {account.id}>
                        <td> { account.accountNumber} </td>   
                        <td> {account.accountOpenDate}</td>
                        <td> {account.accountBalance}</td>
                        <td> {account.accountRoutingNumber} </td>   
                        <td> {account.accountType}</td>
                        <td>
                        <Button variant="secondary" size="sm"  onClick={() => this.openModal(account)}>Show Transactions </Button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </div>  
         
         }
     
        {this.state.showTransactionsModal && (
          <Modal size="sm" isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button
                className="alignRight close-modal"
                onClick={this.closeModal}
              >
                X
              </button>
              <div>
               
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
export default connect(mapStateToProps, {getAccounts })(
    ViewAccounts
);