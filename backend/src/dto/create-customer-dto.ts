// create customer dto 
export interface CreateCustomerDto {
    username: string;
    password: string;
    salary?: number;
    national_card_id: string;
}