import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { getAccounts } from '../../actions/accountActions';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import moment from 'moment';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class AdminViewTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: this.props.match.params.id,
        transactions:[],
        currentPage:0
    };
    this.handlePageClick = this.handlePageClick.bind(this);
}

async componentDidMount() {
  console.log(this.state.id);
     axios.get(process.env.REACT_APP_URL + "/api/transaction/"+this.state.id).then(res => {
        console.log(res.data);
        this.setState({transactions: res.data})
      });
}
handlePageClick({ selected: selectedPage }) {
    this.setState({currentPage:selectedPage});
 }

back = () => {
    this.props.history.push("/bankerhome/addcustomer");
}

render() {
    const PER_PAGE = 7;
        const offset = this.state.currentPage * PER_PAGE;
        const currentPageData = this.state.transactions
            .slice(offset, offset + PER_PAGE)
            .map((transaction) => (
                                            <tr key={transaction.id}>
                                                <td> {transaction.txnDate} </td>
                                                <td> {transaction.transactionAmount}</td>
                                                <td> {transaction.transactionType}</td>
                                                <td> {transaction.operationsType} </td>
                                                <td> {transaction.memo} </td>
                                                <td> {transaction.runningBalance} </td>
                                            </tr>
                                        ));
        const pageCount = Math.ceil(this.state.transactions.length / PER_PAGE);
        console.log(this.state.transactions);
  return (
    <div>
      <header className="pageHeader">
          <h5 className="center"> V I E W &nbsp;&nbsp; T R A N S A C T I O N S</h5>
        </header>
        <br/>
        <Button size="sm" className="center marginBuffer" variant="secondary" onClick={() => this.back()}> Back to Customers Dashboard</Button>
  
        <br/>
        <br/>
      
        {this.state.transactions.length === 0 ? <h6 className="center">N O&nbsp;&nbsp;T R A N S A C T I O N S !</h6>
                    :
                    <>
                     <h6 className="center">L I S T &nbsp;&nbsp; OF &nbsp;&nbsp; T R A N S A C T I O N S</h6>
                    <div className="tableContainer">
                       
                          
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th> Date</th>
                                            <th> Amount</th>
                                            <th> Transaction Type</th>
                                            <th> Operations Type</th>
                                            <th> Memo </th>
                                            <th> Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {currentPageData}
                                    </tbody>
                                </table>
                                {this.state.transactions.length > PER_PAGE?
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
                 </>
                }
    
    </div>
  );
}
}

export default AdminViewTransactions;