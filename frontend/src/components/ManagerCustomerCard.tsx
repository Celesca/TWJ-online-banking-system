// CustomerCard.tsx

import React from "react";
import { CustomerData } from "../model/CustomerData";
import { RxCross1 } from "react-icons/rx";
import { FaPencilAlt } from "react-icons/fa";
import "./CustomerCard.css";

interface CardProps {
  customer: CustomerData;
  onClickCard: (email: string) => void;
  onDelete: (accountId: string) => void; // Add onDelete prop
}

const ManagerCustomerCard: React.FC<CardProps> = ({ customer, onClickCard, onDelete }) => {
  return (
    <div className="rounded-lg bg-white my-8 customer-card">
      <div className="flex justify-between p-4">
        <div className="flex flex-col justify-between">
          <h1 className="text-lg font-semibold">{customer.first_name} {customer.last_name}</h1>
          <h1 className="text-lg font-semibold">{customer.email}</h1>
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-lg font-semibold">{customer.phone_number}</h1>
          <h1 className="text-lg font-semibold">{customer.national_card_id}</h1>
        </div>
        <div className="flex">
                <FaPencilAlt onClick={() => onClickCard(customer.email)} />
                <RxCross1 className="delete-button" onClick={() => onDelete(customer.account_id)}/>
        </div>
        
      </div>
    </div>
  );
};

export default ManagerCustomerCard;