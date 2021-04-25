import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { getAccounts, deleteAccount} from '../../actions/accountActions';
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import ReactPaginate from 'react-paginate';
class ViewAccounts extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: this.props.match.params.id,
        accounts: [],
        currentPage:0
      };
      this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick({ selected: selectedPage }) {
        this.setState({currentPage:selectedPage});
     }
     
    back = () => {
        this.props.history.push("/bankerhome/addcustomer");
    }

    delete(accountId){
        this.props.deleteAccount(this.state.id,accountId);
        this.props.history.push("/bankerhome/addcustomer");
    }

    viewTransactions(id){
        this.props.history.push(`/bankerhome/viewtransactions/${id}`);
    }
    async componentDidMount() {

          await this.props.getAccounts(this.state.id);
          console.log(this.props.accounts);
          this.setState({ accounts: this.props.accounts.accounts });
        }
      
    render(){
        const PER_PAGE = 7;
        const offset = this.state.currentPage * PER_PAGE;
        const currentPageData = this.state.accounts
            .slice(offset, offset + PER_PAGE)
            .map((account) => (
                <tr key = {account.id}>
                   <td> { account.accountNumber} </td>   
                   <td> {account.accountOpenDate}</td>
                   <td> {account.accountBalance}</td>
                   <td> {account.accountType}</td>
                   <td>
                   <Button variant="secondary" size="sm" onClick={() => this.viewTransactions(account.id)}>Transactions</Button>{" "}
                   <Button variant="danger" size="sm" onClick={() => this.delete(account.id)}>Delete Account </Button>
                   </td>
               </tr>
             ))
        const pageCount = Math.ceil(this.state.accounts.length / PER_PAGE);
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
                      {currentPageData}
                    </tbody>
                  </table>
                  {this.state.accounts.length > PER_PAGE ?
                                   <div className="marginBuffer">
                                   <ReactPaginate
                       previousLabel={"← Previous"}
                       nextLabel={"Next →"}
                       pageCount={pageCount}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       previousLinkClassName={"pagination__link"}
                       nextLinkClassName={"pagination__link"}
                       disabledClassName={"pagination__link--disabled"}
                       activeClassName={"pagination__link--active"}
                   />
                   </div> : null
                            }

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
