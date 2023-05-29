import React from "react";
import { Link } from "react-router-dom";

const TransactionListItem = (props) => {
  //  console.log(props);
  return (
    <tr>
      <td>{props.transaction.createdAt}</td>
      <td>{props.transaction.merchantName}</td>
      <td>{props.transaction.acquirerName}</td>
      <td>{props.transaction.originalAmount}</td>
      <td>{props.transaction.originalCurrency}</td>
      <td>{props.transaction.status}</td>
      <td>
        <Link to={`/transaction/${props.transaction.transactionId}`}>
          Detail
        </Link>
      </td>
      <td>
        <Link to={`/client/${props.transaction.transactionId}`}>Client</Link>
      </td>
    </tr>
  );
};

export default TransactionListItem;
