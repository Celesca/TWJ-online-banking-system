SET sql_mode = '';

CREATE TABLE IF NOT EXISTS customer (
    customer_username varchar(30) PRIMARY KEY UNIQUE NOT NULL,
    password varchar(20) NOT NULL,
    salary int,
    national_card_id varchar(15) NOT NULL,
    blacklist boolean DEFAULT false NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (national_card_id) REFERENCES person(national_card_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS person (
    national_card_id varchar(15) PRIMARY KEY UNIQUE NOT NULL,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    birth_date date NOT NULL,
    phone_number varchar(10) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    address varchar(255) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS staff (
    username varchar(30) PRIMARY KEY UNIQUE NOT NULL,
    password varchar(20) NOT NULL,
    salary int NOT NULL,
    national_card_id varchar(15) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (national_card_id) REFERENCES person(national_card_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS account (
    account_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    account_type_id int NOT NULL,
    balance DOUBLE(10,2) NOT NULL,
    customer_username varchar(30) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    closed_date timestamp DEFAULT NULL, -- Set default value to NULL
    status varchar(10) DEFAULT 'active' NOT NULL,
    FOREIGN KEY (customer_username) REFERENCES customer(customer_username) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (account_type_id) REFERENCES account_type(account_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS account_type (
    account_type_id int PRIMARY KEY UNIQUE NOT NULL,
    description varchar(255) NOT NULL,
    account_type_name varchar(45) NOT NULL,
    interest_rate DOUBLE(10,2) NOT NULL,
    interest_period int NOT NULL,
    value_of_package DOUBLE(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS transaction (
    transaction_id int PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
    transaction_type varchar(45) NOT NULL,
    amount DOUBLE(10,2) NOT NULL,
    transaction_date timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    from_account_id varchar(10) NOT NULL,
    to_account_id varchar(10) NOT NULL,
    FOREIGN KEY (from_account_id) REFERENCES account(account_id),
    FOREIGN KEY (to_account_id) REFERENCES account(account_id),
    FOREIGN KEY (transaction_type) REFERENCES transaction_type(transaction_type_name) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS transaction_type (
    transaction_type_id varchar(10) PRIMARY KEY UNIQUE NOT NULL,
    description varchar(255) NOT NULL,
    transaction_type_name varchar(45) NOT NULL,
    asscoiated_fee DOUBLE(10,2) NOT NULL,
    origin_type varchar(45) NOT NULL,
    destination_type varchar(45) NOT NULL,
    max_limit DOUBLE(10,2),
    min_limit DOUBLE(10,2)
);

CREATE TABLE IF NOT EXISTS loan (
    loan_id int PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
    loan_type int NOT NULL,
    loan_amount DOUBLE(10,2) NOT NULL,
    left_amount DOUBLE(10,2) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    closed_date timestamp,
    npl boolean DEFAULT false NOT NULL,
    customer_username varchar(30) NOT NULL,
    FOREIGN KEY (customer_username) REFERENCES customer(customer_username) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (loan_type) REFERENCES loan_type(loan_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS loan_type (
    loan_type_id int PRIMARY KEY UNIQUE NOT NULL,
    loan_type_name varchar(45) NOT NULL,
    interest_rate DOUBLE(10,2) NOT NULL,
    interest_period int NOT NULL,
    value_of_package DOUBLE(10,2) NOT NULL
);