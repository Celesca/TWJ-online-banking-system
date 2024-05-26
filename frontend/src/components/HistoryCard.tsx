import React from "react";
import "./CustomerCard.css";
import { HistoryData } from "../model/HistoryData";

interface CardProps {
  history: HistoryData;
}

const HistoryCard: React.FC<CardProps> = ({ history }) => {
  return (
    <div className="w-1/2 mx-auto p-4 mb-4 shadow-lg rounded-lg bg-white my-8 customer-card">
      <div className="flex justify-between p-4">
        <div className="flex flex-col justify-between">
            <div className="text-sm">Change ID : {history.change_id}</div>
            <div className="text-sm">Entity Type : {history.entity_type}</div>
            <div className="text-sm">Entity ID : {history.entity_id}</div>
            <div className="text-sm text-red-500">Old Interest Rate : {history.old_interest_rate}</div>
            <div className="text-sm text-green-500">New Interest Rate : {history.new_interest_rate}</div>
            <div className="text-sm">Position : {history.position}</div>
            <div className="text-sm">Staff Email : {history.staff_email}</div>
        </div>

        <p>{history.change_date}</p>
        
      </div>
    </div>
  );
};

export default HistoryCard;