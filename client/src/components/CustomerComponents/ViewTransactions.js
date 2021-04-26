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
import DatePicker from 'react-datepicker';
import { subDays } from 'date-fns';

class NewTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: this.props.match.params.id,
        fromDate:"",
        toDate:"",
        transactions:[],
        currentPage:0,
        today:"",
        dateBefore18months:""

    };
    this.handlePageClick = this.handlePageClick.bind(this);
}
handlePageClick({ selected: selectedPage }) {
    this.setState({currentPage:selectedPage});
 }
async componentDidMount() {
  console.log(this.state.id);
  var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var day2 = day;
    var month2 = (month+6) % 12;
    var year2 = "";
    if(month > 6){
        year2 = year - 1;
    }
    else{
        year2 = year - 2;
    }

    let today = year+"-"+("0" + month).slice(-2)+"-"+("0" + day).slice(-2);
    let dayPast18months = year2+"-"+("0" + month2).slice(-2)+"-"+("0" + day2).slice(-2);
    this.setState({today:today,dateBefore18months:dayPast18months});
  
}
back = () => {
    this.props.history.push("/customerhome/accounts");
}
fetch = () => {
    console.log(this.state);
    axios.get(process.env.REACT_APP_URL + "/api/transaction/view/"+this.state.id,
    { params: { fromDate: this.state.fromDate, toDate: this.state.toDate } }).then(res => {
        console.log(res.data);
        this.setState({transactions: res.data})
      });
    
}

render() {
    const PER_PAGE = 5;
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
        ))
    const pageCount = Math.ceil(this.state.transactions.length / PER_PAGE);
    console.log(this.state);
  return (
    <div>
      <header className="pageHeader">
          <h5 className="center"> V I E W &nbsp;&nbsp; T R A N S A C T I O N S</h5>
        </header>
        <br/>
        <Button size="sm" className="center marginBuffer" variant="secondary" onClick={() => this.back()}> Back to Accounts Dashboard</Button>
  
        <br/>
        <br/>
        <Container>

       <Form className=" marginBuffer">
        <Form.Row>
        <Form.Group as={Col} controlId="dob">
                            <Form.Label>F R O M  &nbsp;&nbsp; D A T E</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" min={this.state.dateBefore18months} max={this.state.today}
                            onChange={(event) => this.setState({ fromDate: moment(moment(event.target.value,'yyyy-MM-DD')).format('yyyy-MM-DD') })}/>
                        </Form.Group>
          <Form.Group as={Col} controlId="dob">
                            <Form.Label>T O  &nbsp;&nbsp; D A T E</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth"  min={this.state.fromDate}  max={this.state.today}
                            onChange={(event) => this.setState({ toDate: moment(moment(event.target.value,'yyyy-MM-DD')).format('yyyy-MM-DD') })}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="dob">
                        <Button size="sm" className="center marginBuffer" variant="secondary" onClick={() => this.fetch()}> Fetch Transactions</Button>
                        </Form.Group>
        </Form.Row>
        </Form>
        {this.state.transactions.length === 0 ? <h6 className="center">N O&nbsp;&nbsp;T R A N S A C T I O N S !</h6>
                    :
                    <>
                     <h6 className="center">L I S T &nbsp;&nbsp; OF &nbsp;&nbsp; T R A N S A C T I O N S</h6>
                    <div className="tableContainer wrapper">
                       
                            <div className="row">
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
                        
                    </div>
                 </>
                }
     </Container>
    </div>
  );
}
}

function mapStateToProps({ accounts }) {
  return { accounts };
}

export default connect(mapStateToProps, {
  getAccounts
})(NewTransaction);