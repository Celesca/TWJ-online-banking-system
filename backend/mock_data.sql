-- AccountType
INSERT INTO `account_type` (`account_type_id`, `description`, `account_type_name`, `interest_rate`, `value_of_package`)
VALUES (0, 'Secret Account for bank', 'BankAccount', 0.105, NULL);
INSERT INTO `account_type` (`account_type_id`, `description`, `account_type_name`, `interest_rate`, `value_of_package`) 
VALUES (1, '0.105% Account ', 'Low Interest', 0.105, NULL);
INSERT INTO `account_type` (`account_type_id`, `description`, `account_type_name`, `interest_rate`, `value_of_package`) 
VALUES (2, '4% Account 200,000 baht limited', 'High Interest', 4.00, 200000);

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

-- Loan Type
INSERT INTO `loan_type` (`loan_type_id`, `loan_type_name`, `interest_rate`, `interest_period`, `value_of_package`)
VALUES (1, 'Loan 24%', 24, 23, 50000);

-- Staff ID
INSERT INTO `staff` (`email`, `password`, `position`, `staff_salary`, `entry_date`, `national_card_id`, 
`first_name`, `last_name`, `phone_number`, `birth_date`, `address`) VALUES 
('staff.voo@gmail.com', '1234', 'staff', '25000', CURRENT_TIMESTAMP, '1234567890', 'Sung', 'Voo', '0987658970', '2024-05-08', 'Voo city');

-- Staff
INSERT INTO staff (`email`,`password`,`position`,`staff_salary`,`entry_date`,`national_card_id`,`first_name`,`last_name`,`phone_number`,`birth_date`,`address`)
VALUES  ('RishW@twj.com', 'A0a1568Xr', 'Manager', 200000, '2024-01-01 10:00:02', '3000000000001', 'Rishy', 'WangJeng', '0999999999', '2000-01-01 00:00:00', '101 ThungKru Bankok Thailand'),
        ('Bank-one@twj.com', '123', 'Staff', 100000, '2024-01-02 13:52:10', '1000000000002', 'Bank', 'Number-one', '0111111111', '2001-01-01 00:00:00', '111 ThungKru Bankok Thailand'),
        ('Bank-two@twj.com', '321', 'Staff', 75000, '2024-02-14 16:29:37', '1000000000005', 'Money', 'Number-two', '0222222222', '2002-02-02 00:00:00', '222 ThungKru Bankok Thailand');

-- Customer
INSERT INTO customer
VALUES  ("RishW@mail.com","admin",200000,"3000000000001",0,'2024-01-01 10:29:02',"Rishy","WangJeng","0999999999","2000-01-01 00:00:00","101 ThungKru Bankok Thailand","RishW@twj.com"),
        ("Samartsmart@mail.com","12345",50000,"2000000000003",0,"2024-01-03 15:18:48","Samart","Ngandee","0123456789","2000-02-29 00:00:00","999 Trang Thailand","Bank-one@twj.com"),
        ("Somstop@mail.com","54321",30000,"1000000000004",0,"2024-01-03 14:48:52","Somsri","Deedee","0991231234","1980-12-12 00:00:00","100 Lamphun Thailand","Bank-one@twj.com"),
        ("Kondeeja@mil.com","789",60000,"1000000000006",0,"2024-02-15 09:59:06","Kondee","Naenon","0893214321","2001-06-21 00:00:00","500 ThungKru Bankok Thailand","Bank-two@twj.com"),
        ("Joneja@mail.com","001",20000,"3000000000007",1,"2024-02-16 08:15:25","Jone","Naenon","0500010001","2001-06-22 00:00:00","500 ThungKru Bankok Thailand","Bank-two@twj.com"),
        ("TangMaimee@mail.com","NPL101",NULL,"3000000000008",0,"2024-02-20 14:58:41","Tang","Maimee","0777777713","1999-12-31 00:00:00","77 Maesot Tak Thailand","Bank-two@twj.com");

-- Account
INSERT INTO account
VALUES  ('0000000001',0,10000000.00,"RishW@mail.com",'2024-01-01 12:18:59',NULL,'active',0.000),
        ('0000000002',2,50000.00,"Samartsmart@mail.com",'2024-03-01 14:46:01',NULL,'active',0.000),
        ('0000000003',1,3000.00,"Samartsmart@mail.com",'2024-03-01 08:22:55',NULL,'active',0.000),
        ('0000000004',1,10000.00,"Somstop@mail.com",'2024-04-01 10:33:08',NULL,'active',0.000),
        ('0000000005',1,0.00,"Joneja@mail.com",'2024-04-06 11:48:31','2024-04-07 12:09:48','closed',0.395),
        ('0000000006',1,604200.99,"Joneja@mail.com",'2024-04-08 10:13:43',NULL,'active',0.000),
        ('0000000007',2,150000.00,"Joneja@mail.com",'2024-04-10 14:02:54',NULL,'closed',-1.000);

-- Loan
INSERT INTO loan 
(loan_id, loan_type_id, loan_amount, current_loan, created_at, closed_date, npl, customer_email, interest_rate_change)
VALUES 
(1, 30000.00, 0.00, "2024-02-15 10:13:47", "2024-04-15 12:59:35", 0, "Kondeeja@mil.com", 0.000),
(1, 20000.00, 21728.33, "2024-02-16 16:26:24", NULL, 1, "Joneja@mail.com", 1.750),
(1, 20000.00, 20825.00, "2024-04-20 11:10:59", NULL, 0, "TangMaimee@mail.com", 1.000),
(1, 10000.00, 3400.00, "2024-04-24 15:07:54", NULL, 0, "Samartsmart@mail.com", -1.000);