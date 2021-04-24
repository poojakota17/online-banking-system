import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AddCustomer from "./CustomerServices";
import AdminSideBar from "./AdminSideBar";
import ProcessRefund from "./ProcessRefunds";
import ViewCustomerDetails from './ViewCustomerDetails';
import BankerDefaultHome from "./BankerDefaultHome";
import ViewAccounts from "./ViewAccounts";
import AddNewAccount from "./AddNewAccount";

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
                    <Route path="/bankerhome" exact component={BankerDefaultHome} />
                    <Route path="/bankerhome/viewaccounts/:id"  component={ViewAccounts} />
                    <Route path="/bankerhome/processrefunds" component={ProcessRefund} />
                    <Route path="/bankerhome/addcustomer" component={AddCustomer}/>

                    <Route path="/bankerhome/viewcustomer/:id" component={ViewCustomerDetails}/>
                    <Route path="/bankerhome/registeraccount/:id" component={AddNewAccount}/>
                </Switch>
            </div>
        );
    }
}
export default AdminHomePage;
