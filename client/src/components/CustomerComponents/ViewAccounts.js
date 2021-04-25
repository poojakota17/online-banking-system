import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { getAccounts } from '../../actions/accountActions';
import Button from "react-bootstrap/Button";
//import { getTransactions } from "../../actions/transactionActions";
import Zoom from "react-reveal/Zoom";
import Pool from "../../UserPool";
class ViewAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      activeAccount: null
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

  viewTransactions(id){
    this.props.history.push(`/customerhome/viewtransactions/${id}`);
}

  render() {
    console.log(this.props.accounts);
    return (
      <div>
        <header className="pageHeader">
          <h5 className="center">A C T I V E &nbsp; A C C O U N T S</h5>
        </header>
        {this.state.accounts.length === 0 ?<h6 className="center">Y O U &nbsp;&nbsp;D O N ' T&nbsp;&nbsp;H A V E &nbsp;&nbsp;A N Y &nbsp;&nbsp;A C T I V E &nbsp;&nbsp;A C C O U N T S !</h6>
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
                        <Button variant="secondary" size="sm" onClick={() => this.viewTransactions(account.id)}>View Transactions</Button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </div>  
         
         }
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