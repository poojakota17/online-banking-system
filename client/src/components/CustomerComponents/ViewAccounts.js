import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { getAccounts } from '../../actions/accountActions';
import Button from "react-bootstrap/Button";
//import { getTransactions } from "../../actions/transactionActions";
import Zoom from "react-reveal/Zoom";
import Pool from "../../UserPool";
import ReactPaginate from 'react-paginate';
class ViewAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      activeAccount: null,
      currentPage:0
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  handlePageClick({ selected: selectedPage }) {
    this.setState({currentPage:selectedPage});
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
    const PER_PAGE = 7;
        const offset = this.state.currentPage * PER_PAGE;
        const currentPageData = this.state.accounts
            .slice(offset, offset + PER_PAGE)
            .map((account) => (
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
           ))
        const pageCount = Math.ceil(this.state.accounts.length / PER_PAGE);
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