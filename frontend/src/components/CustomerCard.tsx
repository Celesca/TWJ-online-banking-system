// CustomerCard.tsx

import React from "react";
import { CustomerData } from "../model/CustomerData";
import "./CustomerCard.css";

interface CardProps {
  customer: CustomerData;
  onClickCard: (customer_email: string) => void;
}

const CustomerCard: React.FC<CardProps> = ({ customer, onClickCard }) => {
  return (
    <div className="rounded-lg bg-white my-8 customer-card"
    onClick={() => onClickCard(customer.email)}
    >
      <div className="flex justify-between p-4">
        <div className="flex flex-col justify-between">
          <h1 className="text-lg font-semibold">{customer.first_name} {customer.last_name}</h1>
          <h1 className="text-lg font-semibold">{customer.email}</h1>
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-lg font-semibold">{customer.phone_number}</h1>
          <h1 className="text-lg font-semibold">{customer.national_card_id}</h1>
        </div>
        
      </div>
    </div>
  );
};

export default CustomerCard;