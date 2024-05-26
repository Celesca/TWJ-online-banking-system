# TWJ Online Banking System

TWJ Online Banking System is the project from CPE241 Database Systems.

## Feature

* Customer
  - Deposit to account
  - Transfer money
  - Loaning
 
* Staff
  - Change Interest Rate of account and loan of customer
  - View all transactions
 
* Manager
  - Update / Delete Customer
  - Update / Delete Staff
  - Change interest rate of account types and loan types
  - Change interest rate of account and loan
  - View all transactions
  - View change history

## Installation


1. Cloning project to your local

`git clone https://github.com/Celesca/online-banking-system-express.git`

2. Move in the project directory

`cd online-banking-system-express`

3. Install dependencies in frontend folder

`cd frontend && npm install`

4. Install dependencies in backend folder

`cd ../backend && npm install`

5. Create the .env folder

6. Open MySQL database via Docker CLI in backend folder

`docker-compose up --build`

🛑 If having problem with using request to MySQL server tried this :

`GRANT ALL PRIVILEGES ON *.* TO 'root'@'192.168.144.1' IDENTIFIED BY 'password' WITH GRANT OPTION;`

You can do it with the exec in the Docker Desktop of that Docker Container.
but If you want something hard. Let say we do it with Docker CLI with `docker exec -it bank_db bash`

---

All done, you have setup all the project.
Now, let's move to how to start the server

* For frontend server, we use `npm run dev` at frontend folder

Note : Frontend Server started at port 5173.
So open <a>http://localhost:5173</a>

* For backend server, we use `npm run dev` at backend folder

Note : Backend Server started at port 3000. while MySQL started at port 3306.

## API Endpoints (OpenAPI Specification)

You can use Swagger at <a>http://localhost:3000/swagger-ui</a>

## Tech stack 🕵️
  - Frontend : React, Tailwind
  - Backend : Express (TypeScript), MySQL

 ## Members
