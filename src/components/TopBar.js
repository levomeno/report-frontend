import React from "react";
import logo from "../assets/analytics.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class TopBar extends React.Component {
  onClickLogout = () => {
    const action = {
      type: "logout-success",
    };
    this.props.dispatch(action);
  };

  render() {
    let links = (
      <ul className="nav navbar-nav" style={{ marginLeft: "auto" }}>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Log In
          </Link>
        </li>
      </ul>
    );
    if (this.props.user.isLoggedIn) {
      links = (
        <ul
          className="nav navbar-nav"
          onClick={this.onClickLogout}
          style={{ marginLeft: "auto", cursor: "pointer" }}
        >
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Log Out
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <div className="bg-white shadow-sm mb-2">
        <div className="container">
          <nav className="navbar navbar-light navbar-expand">
            <Link
              to="/"
              className="navbar-brand"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={logo}
                width="60"
                alt="Report"
                style={{ marginRight: "10px" }}
              />
              <span style={{ marginLeft: "10px" }}>
                Financial House Reporting
              </span>
            </Link>
            {links}
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(TopBar);
