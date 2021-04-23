import React, {Component} from 'react';
import { getUser } from "../../actions/userActions";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

class ViewCustomerDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            customer: {}
        }
    }

    back(){
        this.props.history.goBack();
    }

    async componentDidMount(){
        console.log(this.state.id);
        await this.props.getUser(this.state.id);
        this.setState({
            customer: this.props.users.user
        })
    }

    render() {
        return (
            <div>
                 <header className="pageHeader">
                    <h5 className="center">C U S T O M E R  &nbsp;&nbsp; D E T A I L S</h5>
                </header>
                <br></br>
                <Button className="center marginBuffer" variant="secondary" onClick={() => this.back()}> Back to Customers List</Button>
                <br />
                <br />
                <div className = "card col-md-6 offset-md-3">
                    <div className = "card-body">
                        <div className = "row">
                            <label> Customer First Name: </label>
                            <div> { this.state.customer.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Customer Last Name: </label>
                            <div> { this.state.customer.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Customer Email ID: </label>
                            <div> { this.state.customer.email }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps({ users}) {
    return { users};
  }
  export default connect(mapStateToProps, {
    getUser
  })(ViewCustomerDetails);
