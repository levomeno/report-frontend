import React from "react";
import TransactionList from "../components/TransactionList";

class HomePage extends React.Component {
  render() {
    return (
      <div data-testid="homepage">
        <TransactionList />
      </div>
    );
  }
}

export default HomePage;
