import { CustomerData } from "../model/CustomerData";
import "./CustomerCard.css";

interface ModalProps {
    customer: CustomerData;
    onClickCard: (email: string) => void;
}



const CustomerCard:React.FC<ModalProps> = ({ customer, onClickCard }) => {
    return (
        <div className="rounded-lg bg-white my-8 customer-card" onClick={() => onClickCard(customer.email)}>
                <div className="flex flex-col p-4">
                        <div className="flex flex-row justify-between ">
                                <h1 className="text-lg font-semibold">{customer.first_name} {customer.last_name}</h1>
                                <h1 className="text-lg font-semibold">{customer.email}</h1>
                        </div>
                        <div className="flex flex-row justify-between">
                                <h1 className="text-lg font-semibold">{customer.phone_number}</h1>
                                <h1 className="text-lg font-semibold">{customer.national_card_id}</h1>
                        </div>
                </div>
        </div>
    );
};

export default CustomerCard;