import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import ShoppingList from './pages/Shopping/shoppingList';
import SignUp from './pages/SignUp/SignUp';
import Register from './components/Register/Register';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/" component={Main} />
          <Route exact path="/List" component={ShoppingList} />
          <Route exact path="/Detail" component={Detail} />
          <Route exact path="/Register" component={Register} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
