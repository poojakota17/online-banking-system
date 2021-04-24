import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { getAccounts, deleteAccount} from '../../actions/accountActions';
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

class ViewAccounts extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: this.props.match.params.id,
        accounts: []
      };
    }

    back = () => {
        this.props.history.push("/bankerhome/addcustomer");
    }

    delete(accountId){
        this.props.deleteAccount(this.state.id,accountId);
        this.props.history.push("/bankerhome/addcustomer");
    }


    async componentDidMount() {

          await this.props.getAccounts(this.state.id);
          console.log(this.props.accounts);
          this.setState({ accounts: this.props.accounts.accounts });
        }
      
    render(){
        return (
            <>
                <header className="pageHeader">
                    <h5 className="center">V I E W  &nbsp;&nbsp;A C C O U N T S</h5>
                </header>
                <br/>
                <Button className="center marginBuffer" variant="secondary" onClick={() => this.back()}> Back to Customers List</Button>
                <br />
                {this.state.accounts.length === 0 ?<><br /><br /><h6 className="center">T H I S &nbsp;&nbsp;C U S T O M E R &nbsp;&nbsp; D O E S N ' T&nbsp;&nbsp;H A V E &nbsp;&nbsp;A N Y &nbsp;&nbsp;A C T I V E &nbsp;&nbsp;A C C O U N T S !</h6>
              </> :
              
              <div className="tableContainer">
            
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th> Account Number</th>
                        <th> Opened Date</th>
                        <th> Account Balance</th>
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
                            <td> {account.accountType}</td>
                            <td>
                            <Button variant="secondary" size="sm" >Transactions</Button>{" "}
                            <Button variant="danger" size="sm" onClick={() => this.delete(account.id)}>Delete Account </Button>
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
            

            </div>  
             
             }
    
            </>
        );
        
    }
   
}

function mapStateToProps({ accounts }) {
    return { accounts };
  }
  export default connect(mapStateToProps, {getAccounts, deleteAccount })(
      ViewAccounts
  );
