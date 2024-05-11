# TWJ Online Banking System

TWJ Online Banking System is the project from CPE241 Database Systems.

## Feature

## Installation


1. Cloning project to your local

`git clone https://github.com/Celesca/online-banking-system-express.git`

2. Move in the project directory

`cd online-banking-system-express`

3. Install dependencies in frontend folder

`cd frontend && npm install`

4. Install dependencies in backend folder

`cd ../backend && npm install`

5. Open MySQL database via Docker CLI in backend folder

`docker-compose up --build`

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
