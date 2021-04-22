import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainHomePage from './components/MainHomePage';
import CustomerLogin from './components/CustomerLogin';
import BankerLogin from './components/BankerLogin';
import CustomerHomePage from './components/CustomerComponents/CustomerHomePage';
import BankerDashboard from './components/BankerComponents/BankerDashboard';
import { Account } from "./Account";
import { Provider } from "react-redux";
import store from "./store";

function App() {

  return (
    <Provider store={store}>
    <Router>
       <Account>
        <Switch>
          <Route path="/" exact component={MainHomePage} />
          <Route path="/customerlogin"  component={CustomerLogin} />
          <Route path="/bankerlogin" component={BankerLogin} />
          <Route path="/customerhome" component={CustomerHomePage} />
          <Route path="/bankerhome" component={BankerDashboard} />
        </Switch>
      </Account>
    </Router>
     </Provider>
);
}
export default App;

