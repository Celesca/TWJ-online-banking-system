// CustomerCard.tsx

import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FaPencilAlt } from "react-icons/fa";
import "../CustomerCard.css";
import { StaffInfoData } from "../../model/StaffInfoData";

interface CardProps {
  staff: StaffInfoData;
  onClickCard: (email: string) => void;
  onDelete: (accountId: string) => void; // Add onDelete prop
}

const ManagerStaffCard: React.FC<CardProps> = ({ staff, onClickCard, onDelete }) => {
  return (
    <div className="rounded-lg bg-white my-8 customer-card">
      <div className="flex justify-between p-4">
        <div className="flex flex-col justify-between">
          <h1 className="text-lg font-semibold">{staff.first_name} {staff.last_name}</h1>
          <h1 className="text-lg font-semibold">{staff.email}</h1>
          <h1 className="text-lg font-semibold">Phone : {staff.phone_number}</h1>
          <h1 className="text-lg font-semibold">National Card ID : {staff.national_card_id}</h1>
        </div>
       
        <div className="flex items-center">
          <div onClick={() => onClickCard(staff.email)}
          className="bg-[#4048FF] p-3 rounded-lg mr-3 edit-button">
                <FaPencilAlt  />
            </div>
            <div 
            onClick={() => onDelete(staff.email)}
            className="bg-red-500 p-3 rounded-lg delete-button">
                <RxCross1 className="delete-button" />
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default ManagerStaffCard;