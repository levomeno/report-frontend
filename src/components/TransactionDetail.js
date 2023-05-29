import React from "react";

const TransactionDetail = (props) => {
  return (
    <div className="card" style={{ width: "18rem", margin: "5px" }}>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.value}</p>
      </div>
    </div>
  );
};

export default TransactionDetail;
