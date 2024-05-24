import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TransferSummary = () => {
    const { transactionId } = useParams<{ transactionId: string }>();

    const [transactionDate, setTransactionDate] = useState('');
    const [transactionRefId, setTransactionRefId] = useState('');
    const [amount, setAmount] = useState(0);
    const [fee, setFee] = useState(0);
    const [fromAccountFirstName, setFromAccountFirstName] = useState('');
    const [fromAccountLastName, setFromAccountLastName] = useState('');
    const [toAccountFirstName, setToAccountFirstName] = useState('');
    const [toAccountLastName, setToAccountLastName] = useState('');
    const [balance, setBalance] = useState<number>(0);

    const queryNames = async (fromAccountId: string, toAccountId: string) => {
        try {
            const originResponse = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/accounts/info/${fromAccountId}`);
            const destinationResponse = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/accounts/info/${toAccountId}`);
            if (originResponse.data.length > 0 && destinationResponse.data.length > 0) {
                setFromAccountFirstName(originResponse.data[0].first_name);
                setFromAccountLastName(originResponse.data[0].last_name);
                setToAccountFirstName(destinationResponse.data[0].first_name);
                setToAccountLastName(destinationResponse.data[0].last_name);
            }
        } catch (error) {
            console.error("Error fetching account names:", error);
        }
    }

    const queryLeftBalance = async (account_id : string) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/accounts/balance/${account_id}`)
            if (response.data.length > 0) {
                setBalance(response.data[0].balance)
            }
        } catch (error) {
            console.error("Error fetching transaction data:", error);
        }
    }

    const queryTransaction = async (transactionId: string) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/transactions/summary/${transactionId}`);
            console.log(response.data[0])
            if (response.data.length > 0) {
                const transaction = response.data[0];
                setTransactionDate(transaction.transaction_date);
                setTransactionRefId(transaction.transaction_id);
                setAmount(transaction.amount);
                setFee(transaction.associated_fee);
                queryLeftBalance(transaction.from_account_id);
                queryNames(transaction.from_account_id, transaction.to_account_id);
            }
        } catch (error) {
            console.error("Error fetching transaction data:", error);
        }
    }

    useEffect(() => {
        document.title = "Transfer Summary";
        if (transactionId) {
            queryTransaction(transactionId);
        }
    }, [transactionId]);

    return (
        <div className="flex flex-col items-center justify-center h-screen homepage_container">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center mb-4">Successful transfer</h2>
                <p className="text-center mb-2">{transactionDate}</p>
                <p className="text-center mb-4">Ref ID: {transactionRefId}</p>

                <div className="border-t border-gray-200 py-4">
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">FROM</span>
                        <span>{`${fromAccountFirstName} ${fromAccountLastName}`}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">TO</span>
                        <span>{`${toAccountFirstName} ${toAccountLastName}`}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">AMOUNT</span>
                        <span>{amount}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">FEE</span>
                        <span>{fee}</span>
                    </div>
                </div>

                <div className="bg-gray-200 text-center py-4 mt-4 rounded">
                    <p>Your remaining balance after this transfer will be {balance.toFixed(2)}</p>
                </div>

                <div className="text-center mt-6">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-400"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TransferSummary;