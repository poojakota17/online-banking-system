import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import AdminSideBar from "./AdminSideBar";
import ProcessRefund from "./ProcessRefunds";
import ViewTransactions from "./ViewTransactions";


import RequestRefund from "../CustomerComponents/RequestRefund";
import BankerDashboard from "./BankerDashboard";

class AdminHomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <div >
                    <AdminSideBar/>
                </div>
                <Switch>
                    {/*<Route path="/bankerhome" exact component={BankerDashboard} />*/}
                    <Route path="/bankerhome/viewtransactions"  component={ViewTransactions} />
                    <Route path="/bankerhome/processrefunds" component={ProcessRefund} />
                    <Route path="/bankerhome/addcustomer" component={AddCustomer}/>


                    <Route path="/bankerhome/requestrefund" component={RequestRefund} />
                </Switch>
            </div>
        );
    }
}
export default AdminHomePage;
