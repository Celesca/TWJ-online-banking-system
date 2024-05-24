export interface MyLoan {
    loan_id: number;
    loan_type_name: string;
    current_loan: number;
    interest_rate: number;
    interest_period: number;
    created_at: Date;
    customer_email: string;
}