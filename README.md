# Store Billing System

A full-stack store billing application built with **Node.js**, **Express**, **MySQL**, and **React**.  
This app allows store owners to manage products and create billing invoices with real-time calculations and print functionality.

---

## Features

- Product management (Add, Update, Delete, View) with MySQL backend
- Billing interface to add products by label number or name and calculate totals
- Admin authentication via a simple password
- Dynamic product suggestions using datalist
- Print and reset billing invoices
- Real-time clock and responsive UI

---

## Tech Stack

- **Backend:** Node.js, Express, MySQL2, CORS
- **Frontend:** React, Axios, React Router
- **Database:** MySQL

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MySQL server installed and running
- npm (comes with Node.js)

### Setup Backend

1. Clone the repo:
 
    ```bash
   git clone https://github.com/veeraskumar/store-billing.git
   cd store-billing
   
2. Backend setup:

   - Navigate to backend folder (if separated) or root if combined.
   - Install dependencies:
    
     ```bash
     npm install

3. setup MySQL database:

   - Create a database named study.
   - Create a table named products with columns:
   - labelno (PRIMARY KEY), productName, price

   ## Example SQL:

      ```bash
      CREATE DATABASE study;
      
      USE study;
      
      CREATE TABLE products (
        labelno VARCHAR(50) PRIMARY KEY,
        productName VARCHAR(255),
        price DECIMAL(10,2)
      );
      
4. Update MySQL connection details in the backend code if needed (host, user, password).

5. Start the backend server:
 
   ```bash
   npm start

6. Setup Frontend
  
   ```bash
   npm run dev

7. Usage:

   - Open http://localhost:3000 in your browser for billing interface.
   - Open http://localhost:3000/admin for the admin panel.
   - Admin password is: hello
   - 
---

###  Structure of project
   ```bash
   store-billing/
   ├── backend/ (or may just be at the root)
   │   ├── server.js             ← Express + MySQL server code
   │   ├── package.json
   │   └── node_modules/         ← Installed dependencies
   ├── frontend/
   │   ├── src/
   │   │   ├── components/
   │   │   │   ├── Admin.jsx
   │   │   │   ├── BillingColumns.jsx
   │   │   │   └── Navbar.jsx
   │   │   ├── api/
   │   │   │   └── express.js    ← Axios instance for API calls
   │   │   ├── assets/
   │   │   │   └── M9t6b801.svg  ← Brand logo
   │   │   ├── App.css
   │   │   └── index.js          ← React entry point
   │   ├── package.json
   │   └── node_modules/
   ├── .gitignore
   ├── LICENSE
   └── README.md






