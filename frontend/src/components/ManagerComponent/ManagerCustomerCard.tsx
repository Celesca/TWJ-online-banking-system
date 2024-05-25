// CustomerCard.tsx

import React from "react";
import { CustomerData } from "../../model/CustomerData";
import { RxCross1 } from "react-icons/rx";
import { FaPencilAlt } from "react-icons/fa";
import "../CustomerCard.css";

interface CardProps {
  customer: CustomerData;
  onClickCard: (email: string) => void;
  onDelete: (accountId: string) => void; // Add onDelete prop
}

const ManagerCustomerCard: React.FC<CardProps> = ({ customer, onClickCard, onDelete }) => {
  return (
    <div className="rounded-lg bg-white my-8 customer-card"
    onClick={() => onClickCard(customer.email)}>
      <div className="flex justify-between p-4">
        <div className="flex flex-col justify-between">
          <h1 className="text-lg font-semibold">{customer.first_name} {customer.last_name}</h1>
          <h1 className="text-lg font-semibold">{customer.email}</h1>
          <h1 className="text-lg font-semibold">Phone : {customer.phone_number}</h1>
          <h1 className="text-lg font-semibold">National Card ID : {customer.national_card_id}</h1>
        </div>
       
        <div className="flex items-center">
          <div onClick={() => onClickCard(customer.email)}
          className="bg-[#4048FF] p-3 rounded-lg mr-3 edit-button">
                <FaPencilAlt  />
            </div>
            <div 
            onClick={() => onDelete(customer.email)}
            className="bg-red-500 p-3 rounded-lg delete-button">
                <RxCross1 className="delete-button" />
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default ManagerCustomerCard;