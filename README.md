# Payroll System

## Overview

The **Payroll System** is a web application built to efficiently manage employee salaries, deductions, and basic details. It provides a seamless user experience with secure authentication and a well-structured backend.

## Features

- **User Authentication:** Secure login and registration using JWT.
- **Employee Management:** Add, update, and remove employee details.
- **Payroll Processing:** Automates salary calculation, including deductions and bonuses.
- **Data Persistence:** MySQL is used to store employee and payroll records.
- **User-Friendly Interface:** Intuitive UI built with React.

## Tech Stack

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Backend-Express.js-black?logo=express)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)
![JWT](https://img.shields.io/badge/Auth-JWT-red?logo=jsonwebtokens)


## Installation

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- MySQL

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Prakhar4749/payroll.git
   cd payroll
   ```
2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the backend directory and add the following environment variables:
   ```txt
   DB_HOST=ba1ilzmad4mczrycuwgm-mysql.services.clever-cloud.com
   DB_USER=<username>
   DB_PASS=<password>
   DB_NAME=ba1ilzmad4mczrycuwgm
   DB_PORT=3306
   SECRET_KEY=admin
   BACKEND_PORT=5000
   ```
   - Run the backend server:
   ```bash
   npm start
   ```
3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   - Create a `.env` file in the frontend directory and add the following environment variable:
   ```txt
   REACT_APP_BASE_URL=http://localhost:5000
   ```
   - Start the frontend server:
   ```bash
   npm start
   ```

## Usage

- Access the application at `http://localhost:3000`.
- Log in to manage payroll operations.
- If you are looking to access trial login credentials or require the username and password for the database, please reach out for assistance. You can obtain this information by sending an email to [prakharsakhare2226@gmail.com](mailto:prakharsakhare2226@gmail.com) or [gaveshbatham1@gmail.com](mailto:gaveshbatham1@gmail.com).

## Contributing

Feel free to fork this repository and contribute by submitting pull requests.

##

