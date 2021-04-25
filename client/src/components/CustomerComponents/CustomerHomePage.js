import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import CustomerSideBar from "./CustomerSideBar";
import AddExternalPayee from './AddExternalPayee';
import CustomerProfile from './CustomerProfile';
import DefaultHomePage from './DefaultHomePage';
import NewTransaction from './NewTransaction';
import ViewAccounts from './ViewAccounts';
import RequestRefund from "./RequestRefund";
import ViewTransactions from './ViewTransactions';
class ClientHomePage extends Component {
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
          <CustomerSideBar
          />
        </div>
        <Switch>
          <Route path="/customerhome" exact component={DefaultHomePage} />
          <Route path="/customerhome/accounts" exact component={ViewAccounts} />
          <Route path="/customerhome/addexternalpayee" component={AddExternalPayee} />
          <Route
            path="/customerhome/newtransaction"
            component={NewTransaction}
          />
          <Route path="/customerhome/myprofile" component={CustomerProfile} />
          <Route path="/customerhome/viewtransactions/:id"  component={ViewTransactions} />
          <Route path="/customerhome/requestrefund" component={RequestRefund} />
        </Switch>
      </div>
    );
  }
}

export default ClientHomePage;