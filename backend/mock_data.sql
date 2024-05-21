INSERT INTO `account_type` (`account_type_id`, `description`, `account_type_name`, `interest_rate`, `interest_period`, `value_of_package`) VALUES (1, 'Savings account', 'Easy Saving', 0.105, 7, NULL);
INSERT INTO `account_type` (`account_type_id`, `description`, `account_type_name`, `interest_rate`, `interest_period`, `value_of_package`) VALUES (2, 'Savings account', 'Hard Saving', 4, 21, NULL);
INSERT INTO `person` (`national_card_id`, `first_name`, `last_name`, `birth_date`, `phone_number`, `email`, `address`) VALUES ('1111111111111', 'John', 'Doe', '1990-01-01', '0812345678', 'test@gmail.com', '1234 Main St, Springfield, IL 62701');

-- Transaction Type
INSERT INTO `transaction_type` 
(`transaction_type_id`, `description`, `transaction_type_name`, `associated_fee`, `origin_type`, `destination_type`, `update_bank_balance`) 
VALUES (1, 'FromOtherBank', 'Receive money from other bank', 0.00, 'OtherBank', 'Account', 1);

INSERT INTO `transaction_type` (`transaction_type_id`, `transaction_type_name`, `description`, `associated_fee`, `origin_type`, `destination_type`, `max_limit`, `update_bank_balance`) 
VALUES (2, 'ToOtherBank', 'Transfer money to other bank', 5.00, 'Account', 'OtherBank', 100000.00, -1);

INSERT INTO `transaction_type` (`transaction_type_id`, `transaction_type_name`, `description`, `associated_fee`, `origin_type`, `destination_type`, `update_bank_balance`) 
VALUES (3, 'InOurBank', 'Transfer money in our bank', 0.00, 'Account', 'Account', 0);

INSERT INTO `transaction_type` (`transaction_type_id`, `transaction_type_name`, `description`, `associated_fee`, `origin_type`, `destination_type`, `update_bank_balance`)
VALUES (4, 'PayLoan', 'Customer pay loan to bank', 0.00, 'Account', 'Loan', 0);

INSERT INTO `transaction_type` (`transaction_type_id`, `transaction_type_name`, `description`, `associated_fee`, `origin_type`, `destination_type`, `min_limit`, `update_bank_balance`) 
VALUES (5, 'BankGivesLoan', 'Bank give loan to customer', 0.00, 'BankAccount', 'Loan', 1000, -1);

INSERT INTO `transaction_type` (`transaction_type_id`, `transaction_type_name`, `description`, `associated_fee`, `origin_type`, `destination_type`, `update_bank_balance`) 
VALUES (6, 'BankGiveInterest', 'Bank give interest to customer', 0.00, 'BankAccount', 'Account', -1);

INSERT INTO `transaction_type` (`transaction_type_id`, `transaction_type_name`, `description`, `associated_fee`, `origin_type`, `destination_type`, `update_bank_balance`) 
VALUES (7, 'OtherBankGiveLoan', 'Otherbank pay the loan for our bank', 0.00, 'Otherbank', 'Loan', 1);

INSERT INTO `transaction_type` (`transaction_type_id`, `transaction_type_name`, `description`, `associated_fee`, `origin_type`, `destination_type`, `update_bank_balance`)
VALUES (8, 'Withdraw', 'Withdraw money from account', 0.00, 'BankAccount', 'Account', -1);

INSERT INTO `transaction_type` (`transaction_type_id`, `transaction_type_name`, `description`, `associated_fee`, `origin_type`, `destination_type`, `update_bank_balance`)
VALUES (9, 'Deposit', 'Deposit money to account', 0.00, 'Account', 'BankAccount', 1);