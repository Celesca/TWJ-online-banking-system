import React from "react";
import "./CustomerCard.css";


interface TransactionData {
    transaction_id: number;
    amount: number;
    transaction_date: string;
    transaction_type_name: string;
    update_bank_balance: number;
    Payee: string;
    from_account_id: string;
    to_account_id: string;
  }

interface CardProps {
  transaction: TransactionData;
}

{/* <div className="text-sm">Transaction ID: {transaction.transaction_id}</div>
<div className="text-sm">Amount: {transaction.amount}</div>
<div className="text-sm">Transaction Date: {transaction.transaction_date}</div>
<div className="text-sm">Transaction Type: {transaction.transaction_type_name}</div>
<div className="text-sm">Payee: {transaction.Payee}</div>
<div className="text-sm">From Account ID: {transaction.from_account_id}</div>
<div className="text-sm">To Account ID: {transaction.to_account_id}</div> */}

const TransactionCard: React.FC<CardProps> = ({ transaction }) => {
  return (
    <div className="w-1/2 mx-auto p-4 mb-4 shadow-lg rounded-lg bg-white my-8 customer-card">
      <div className="flex justify-between p-4">
        <div className="flex flex-col justify-between">
            
          <h1 className="text-lg font-semibold">{transaction.from_account_id}</h1>
          <h1 className="text-lg font-semibold">{transaction.Payee}</h1>
          <h1 className="text-lg font-semibold">{transaction.to_account_id}</h1>
        </div>
        
      </div>
    </div>
  );
};

export default TransactionCard;