import React from "react";
import * as apiCalls from "../api/apiCalls";
import { connect } from "react-redux";
import TransactionDetail from "../components/TransactionDetail";
import { separateByUpperCase } from "../Util/helper";

class ClientDetailPage extends React.Component {
  state = {
    client: {},
  };

  componentDidMount() {
    const transactionId = this.props.match.params.id;
    apiCalls
      .getClient(transactionId, this.props.user.token)
      .then((response) => {
        this.setState({
          client: {
            ...this.state.client,
            ...response.data,
          },
        });
      })
      .catch((error) => {
        this.setState({ loadError: "Client detail load failed" });
      });
  }

  render() {
    //  const map = new Map(Object.entries(this.state.transaction));
    const map = Object.entries(this.state.client).map(([key, value]) => ({
      title: separateByUpperCase(key),
      value,
    }));

    console.log(map);
    return (
      <div className="row">
        {map.map((d) => {
          return (
            <TransactionDetail key={d.title} title={d.title} value={d.value} />
          );
        })}
      </div>
    );
    //<div data-testid="transactiondetailpage">Transaction Detail</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(ClientDetailPage);
