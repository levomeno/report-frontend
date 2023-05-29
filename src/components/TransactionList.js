import React from "react";
import * as apiCalls from "../api/apiCalls";
import { connect } from "react-redux";
import TransactionListItem from "./TransactionListItem";

class TransactionList extends React.Component {
  state = {
    page: {
      transactions: [],
      number: 0,
    },
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = (requestedPage = 0) => {
    // console.log(requestedPage);
    apiCalls
      .listTransactions(
        {
          fromDate: "2015-01-01",
          toDate: "2018-01-01",
          page: requestedPage,
        },
        this.props.user.token
      )
      .then((response) => {
        this.setState({
          page: {
            ...this.state.page,
            ...response.data,
            loadError: undefined,
          },
        });
      })
      .catch((error) => {
        this.setState({ loadError: "Transactions load failed" });
      });
  };

  onClickNext = () => {
    this.loadData(this.state.page.number + 1);
  };

  onClickPrev = () => {
    this.loadData(this.state.page.number - 1);
  };

  render() {
    return (
      <div className="card">
        <h3 className="card-title m-auto">Transactions</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Merchant</th>
              <th scope="col">Acquirer</th>
              <th scope="col">Amount</th>
              <th scope="col">Currency</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.page.transactions.map((transaction) => {
              return (
                <TransactionListItem
                  key={transaction.transactionId}
                  transaction={transaction}
                  token={this.props.user.token}
                />
              );
            })}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginBottom: "20px",
          }}
        >
          {!this.state.page.first && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onClickPrev}
              style={{ marginRight: "10px" }} // Add padding value here
            >
              Previous <span className="badge badge-light"></span>
            </button>
          )}
          {!this.state.page.last && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onClickNext}
              style={{ marginLeft: "10px" }} // Add padding value here
            >
              Next <span className="badge badge-light"></span>
            </button>
          )}
        </div>
        {this.state.loadError && (
          <span className="text-center text-danger">
            {this.state.loadError}
          </span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(TransactionList);
