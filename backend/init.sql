GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS loan_type (
    loan_type_id int PRIMARY KEY UNIQUE NOT NULL,
    loan_type_name varchar(45) NOT NULL,
    interest_rate DOUBLE(10,2) NOT NULL,
    interest_period int NOT NULL,
    value_of_package DOUBLE(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS transaction_type (
    transaction_type_id int PRIMARY KEY UNIQUE NOT NULL,
    description varchar(255) NOT NULL,
    transaction_type_name varchar(45) NOT NULL,
    associated_fee DOUBLE(10,2) NOT NULL,
    origin_type varchar(45) NOT NULL,
    destination_type varchar(45) NOT NULL,
    max_limit DOUBLE(10,2),
    min_limit DOUBLE(10,2),
    update_bank_balance int NOT NULL,
    CONSTRAINT check_transaction_type CHECK (update_bank_balance IN (-1, 0, 1))
);

CREATE TABLE IF NOT EXISTS account_type (
    account_type_id int PRIMARY KEY UNIQUE NOT NULL,
    description varchar(255) NOT NULL,
    account_type_name varchar(45) NOT NULL,
    interest_rate DOUBLE(10,2) NOT NULL,
    value_of_package DOUBLE(10,2)
);

CREATE TABLE IF NOT EXISTS staff (
    email varchar(100) PRIMARY KEY UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    position varchar(45) NOT NULL,
    staff_salary int NOT NULL,
    entry_date timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    national_card_id varchar(15) NOT NULL,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    phone_number varchar(10) NOT NULL,
    birth_date date NOT NULL,
    address varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS customer (
    email varchar(100) PRIMARY KEY UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    customer_salary int,
    national_card_id varchar(13) NOT NULL,
    black_listed boolean DEFAULT false NOT NULL,
    entry_date timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    phone_number varchar(10) NOT NULL,
    birth_date date NOT NULL,
    address varchar(255) NOT NULL,
    staff_email varchar(100),
    FOREIGN KEY (staff_email) REFERENCES staff(email) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS account (
    account_id VARCHAR(10) PRIMARY KEY UNIQUE NOT NULL,
    account_type_id int NOT NULL,
    balance DOUBLE(10,2) DEFAULT 0 NOT NULL,
    customer_email varchar(30) NOT NULL,
    opened_date timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    closed_date timestamp NULL,
    status varchar(10) DEFAULT 'active' NOT NULL,
    interest_rate_change DOUBLE(10,2) DEFAULT 0 NOT NULL,
    FOREIGN KEY (customer_email) REFERENCES customer(email) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (account_type_id) REFERENCES account_type(account_type_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT check_status CHECK (status IN ('active', 'closed'))
);

CREATE TABLE IF NOT EXISTS transaction_tb (
    transaction_id int PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
    transaction_type_id int NOT NULL,
    amount DOUBLE(10,2) NOT NULL,
    transaction_date timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    from_account_id VARCHAR(10) NOT NULL,
    to_account_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (from_account_id) REFERENCES account(account_id),
    FOREIGN KEY (to_account_id) REFERENCES account(account_id),
    FOREIGN KEY (transaction_type_id) REFERENCES transaction_type(transaction_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS loan (
    loan_id int PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
    loan_type_id int NOT NULL,
    loan_amount DOUBLE(10,2) NOT NULL,
    current_loan DOUBLE(10,2) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    closed_date timestamp NULL,
    npl boolean DEFAULT false NOT NULL,
    customer_email varchar(30) NOT NULL,
    interest_rate_change DOUBLE(10,2) DEFAULT 0 NOT NULL,
    FOREIGN KEY (customer_email) REFERENCES customer(email) ON DELETE CASCADE ON UPDATE CASCADE
    FOREIGN KEY (loan_type_id) REFERENCES loan_type(loan_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS interest_rate_change_history (
    change_id INT PRIMARY KEY AUTO_INCREMENT,
    entity_type VARCHAR(30) NOT NULL,
    entity_id VARCHAR(20) NOT NULL,
    old_interest_rate DECIMAL(5,3),
    new_interest_rate DECIMAL(5,3) NOT NULL,
    change_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    staff_email VARCHAR(100) NOT NULL,
    FOREIGN KEY (staff_email) REFERENCES staff(email),
    CONSTRAINT check_entity_type CHECK (entity_type IN ('loan_type', 'account_type'))
);