import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserLoginPage from "../pages/UserLoginPage";
//import * as apiCalls from "../api/apiCalls";
import TopBar from "../components/TopBar";
import TransactionDetailPage from "../pages/TransactionDetailPage";
import ClientDetailPage from "../pages/ClientDetailPage";

// const actions = {
//   postLogin: apiCalls.login,
// };

function App() {
  return (
    <div>
      <TopBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={UserLoginPage} />
          <Route path="/transaction/:id" component={TransactionDetailPage} />
          <Route path="/client/:id" component={ClientDetailPage} />
          {/* <Route
            path="/login"
            component={(props) => (
              <UserLoginPage {...props} actions={actions} />
            )}
          /> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
