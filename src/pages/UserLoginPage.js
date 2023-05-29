import React from "react";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { connect } from "react-redux";
import * as authActions from "../redux/authActions";

export class UserLoginPage extends React.Component {
  state = {
    email: "",
    password: "",
    pendingApiCall: false,
    apiError: undefined,
  };

  onChangeEmail = (event) => {
    const value = event.target.value;
    this.setState({ email: value, apiError: undefined });
  };

  onChangePassword = (event) => {
    const value = event.target.value;
    this.setState({ password: value, apiError: undefined });
  };

  onClickLogin = () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.setState({ pendingApiCall: true });
    this.props.actions
      .postLogin(user)
      // this.props
      //   .dispatch(authActions.loginHandler(user))
      .then((response) => {
        // const action = {
        //   type: "login-success",
        //   payload: {
        //     ...response.data,
        //     password: this.state.password,
        //   },
        // };
        // this.props.dispatch(action);

        // this.props.dispatch(
        //   authActions.loginSuccess({
        //     ...response.data,
        //     password: this.state.password,
        //   })
        // );
        this.setState({ pendingApiCall: false }, () => {
          this.props.history.push("/");
        });
      })
      .catch((error) => {
        this.setState({
          pendingApiCall: false,
          apiError: error.response.data.error,
        });
      });
  };

  render() {
    let disableSubmit = false;
    if (this.state.email === "") {
      disableSubmit = true;
    }
    if (this.state.password === "") {
      disableSubmit = true;
    }

    return (
      <div className="container">
        <h1 className="text-center">Login</h1>
        <div className="col-12 mb-3">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="Your email"
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
        </div>
        <div className="col-12 mb-3">
          <label>Password</label>
          <input
            className="form-control"
            placeholder="Your password"
            type="password"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
        </div>
        {this.state.apiError && (
          <div className="col-12 mb-3">
            <div className="alert alert-danger">{this.state.apiError}</div>
          </div>
        )}
        <div className="text-center">
          <ButtonWithProgress
            onClick={this.onClickLogin}
            disabled={disableSubmit || this.state.pendingApiCall}
            text="Login"
            pendingApiCall={this.state.pendingApiCall}
          />
        </div>
      </div>
    );
  }
}

UserLoginPage.defaultProps = {
  actions: {
    postLogin: () =>
      new Promise((resolve, reject) => {
        resolve({});
      }),
  },
  history: {
    push: () => {},
  },
  dispatch: () => {},
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postLogin: (user) => dispatch(authActions.loginHandler(user)),
    },
  };
};

export default connect(null, mapDispatchToProps)(UserLoginPage);
