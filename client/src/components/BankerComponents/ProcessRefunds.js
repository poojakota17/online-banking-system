import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Pool from "../../UserPool";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { getOpenRequests, getClosedRequests } from "../../actions/refundActions";
import { connect } from "react-redux";
class ProcessRefunds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openRequests: [],
            closedRequests: [],
            selectedOption:""
        };
    }
    async componentDidMount() {

        console.log("calling api");
        await this.props.getOpenRequests();
        console.log(this.props.refundRequests.openRefundRequests);
        this.setState({ openRequests: this.props.refundRequests.openRefundRequests });
        await this.props.getClosedRequests();
        console.log(this.props.refundRequests.closedRefundRequests);
        this.setState({ accounts: this.props.refundRequests.closedRefundRequests });
    }

    onValueChange = (event) => {
        this.setState({
            selectedOption: event.target.value
        });

    }

    processRefund = (request) => {

        console.log(request);
        //Call API to do the transaction and close

    }
    
    render() {
        return (
            <div>
                <header className="pageHeader">
                    <h5 className="center">P R O C E S S &nbsp;&nbsp; R E F U N D &nbsp;&nbsp; R E Q U E S T S </h5>
                </header>
                <br />
                <div className="marginBuffer">
                <div className="radio">
                    <label>{" "}
                        <input
                            type="radio"
                            value="OPEN"
                            checked={this.state.selectedOption === "OPEN"}
                            onChange={this.onValueChange}
                        />{" "}
                    &nbsp;&nbsp;P R O C E S S   &nbsp;&nbsp; O P E N &nbsp;&nbsp; R E Q U E S T S
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="CLOSED"
                            checked={this.state.selectedOption === "CLOSED"}
                            onChange={this.onValueChange}
                        />{" "}
                                 &nbsp;&nbsp;V I E W &nbsp;&nbsp; C L O S E D&nbsp;&nbsp; R E Q U E S T S
                            </label>
                </div>
                </div>
                <hr />
                {this.state.selectedOption === "OPEN" ? 
                
                this.state.openRequests.length === 0 ? <h6 className="center">N O  &nbsp;&nbsp;A C T I V E &nbsp;&nbsp;O P E N&nbsp;&nbsp;R E Q U E S T S !</h6>
                    :
                    <>
                     <h6 className="center">L I S T &nbsp;&nbsp; OF &nbsp;&nbsp; R E F U N D &nbsp;&nbsp; R E Q U E S T S</h6>
                    <div className="tableContainer wrapper">
                        <Container>
                            <div className="row">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th> Account Number</th>
                                            <th> Customer </th>
                                            <th> Amount </th>
                                            <th> Reason </th>
                                            <th> Action </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.openRequests.map((request) => (
                                            <tr key={request.requestId}>
                                                <td> {request.accountNumber}</td>
                                                <td> {request.firstName} {" "}{request.lastName}</td>
                                                <td> {request.amount}</td>
                                                <td> {request.reason}</td>
                                                <td><Button variant="secondary" onClick={()=>{this.processRefund(request)}}>
                            Approve Refund
                        </Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Container>
                    </div>
                 </>
                

                : this.state.selectedOption === "CLOSED" ?
                
                this.state.closedRequests.length === 0 ? <h6 className="center">N O  &nbsp;&nbsp;C L O S E D&nbsp;&nbsp;R E Q U E S T S !</h6>
                    :
                    <>
                     <h6 className="center">L I S T &nbsp;&nbsp; OF &nbsp;&nbsp; C L O S E D &nbsp;&nbsp; R E F U N D &nbsp;&nbsp; R E Q U E S T S</h6>
                    <div className="tableContainer wrapper">
                        <Container>
                            <div className="row">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                            <th> Account Number</th>
                                            <th> Customer </th>
                                            <th> Amount </th>
                                            <th> Reason </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.openRequests.map((request) => (
                                            <tr key={request.requestId}>
                                               <td> {request.accountNumber}</td>
                                                <td> {request.firstName} {" "}{request.lastName}</td>
                                                <td> {request.amount}</td>
                                                <td> {request.reason}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Container>
                    </div>
                 </>
                
                
                : null}
        
               
            </div>
        );
    }
}

function mapStateToProps({ refundRequests }) {
    return { refundRequests };
}

export default connect(mapStateToProps, {
    getOpenRequests, getClosedRequests
})(ProcessRefunds);
