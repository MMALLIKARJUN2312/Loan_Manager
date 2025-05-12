---

# Loan Manager System

A full-stack web application that facilitates the management of loan applications, approvals, and monitoring through user-friendly dashboards for Admins, Verifiers, and Users.

This project is built using modern technologies — **React + Vite + TypeScript** on the frontend and **Node.js + Express + TypeScript + MySQL** on the backend.

---

## Project Structure

loan-manager/
│
├── frontend/ # Frontend (React + Vite + TypeScript)
│ ├── src/
│ │ ├── components/
│ │ │ ├── ApplicationForm/ # User loan application form
│ │ │ │ ├── ApplicationForm.tsx
│ │ │ │ └── ApplicationForm.css
│ │ │ ├── VerifierDashboard/ # Dashboard for loan verifiers
│ │ │ │ ├── VerifierDashboard.tsx
│ │ │ │ └── VerifierDashboard.css
│ │ │ ├── AdminDashboard/ # Dashboard for admin overview
│ │ │ │ ├── AdminDashboard.tsx
│ │ │ │ └── AdminDashboard.css
│ │ │ ├── UserDashboard/ # Dashboard for users to track loans
│ │ │ │ ├── UserDashboard.tsx
│ │ │ │ └── UserDashboard.css
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── index.css
│ ├── index.html
│ ├── tsconfig.json # TypeScript configuration
│ └── vite.config.ts # Vite bundler configuration
│
├── backend/ # Backend (Node.js + Express + TypeScript)
│ ├── src/
│ │ ├── config/
│ │ │ └── db.ts # MySQL database connection
│ │ ├── controllers/
│ │ │ └── loanController.ts # Logic to handle API requests
│ │ ├── routes/
│ │ │ └── loanRoutes.ts # API route definitions
│ │ ├── app.ts # Express app setup
│ │ └── server.ts # Entry point to start the server
│ ├── .env # Environment variable config
│ ├── .gitignore
│ ├── package.json
│ └── tsconfig.json # TypeScript config for backend
│ └── vite.config.json
│
└── README.md

---

## Features

### Loan Application Form
- Users can fill out a loan application with required personal, financial, and loan details.
- Form validation ensures all required fields are properly submitted.

### Admin Dashboard
- Displays total applications and breakdown by approval status.
- Integrated with charts for better visual insight.
- Accessible only by authorized admin roles.

### Verifier Dashboard
- Enables loan verifiers to view and update loan statuses (approve/reject).
- Lists all pending loan applications with details.

### User Dashboard
- Shows users their submitted applications.
- Displays loan status updates in real time.

---

## Tech Stack

### Frontend
- **React** + **Vite** + **TypeScript**
- **Axios** – for HTTP API calls
- **CSS Modules** – for scoped component styling
- **Chart.js** (optional) – for data visualization in dashboards

### Backend
- **Node.js** + **Express** + **TypeScript**
- **MySQL** – for structured data storage
- **dotenv** – for environment variables
- **cors** – to enable cross-origin access between frontend and backend

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- MySQL server running locally or hosted
- npm (comes with Node.js)

---

### 1️. Clone the Repository

git clone https://github.com/YOUR_USERNAME/loan-manager.git
cd loan-manager

---

### 2️. Backend Setup

cd server
npm install

Create a `.env` file inside the `server/` directory:

**Create the database and table manually** or via migration tools:

Start the backend server:

npx ts-node src/server.ts

The backend runs on: **[http://localhost:3000](http://localhost:3000)**

---

### 3️. Frontend Setup

cd ../frontend
npm install
npm run dev

The frontend runs on: **[http://localhost:5173](http://localhost:5173)**

---

## API Overview

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| POST   | `/api/loan/apply`       | Submit a new loan application  |
| GET    | `/api/loans`            | Get all loan applications      |
| GET    | `/api/statistics`       | Get application statistics     |

---

## Sample Loan Object

{
  "id": 1,
  "fullName": "Arjun",
  "email": "arjun1234@gmail.com",
  "loanType": "Personal",
  "loanAmount": 200000.00,
  "status": "pending",
  "createdAt": "2025-05-12T01:03:34.000Z"
}

---

## Testing

* API testing with **Postman**, **Insomnia**, or browser tools.
* Manual UI testing for user flows: apply, verify, track status.

---

## Deployment Tips

* Deploy frontend on **Netlify**, **Vercel**, or **GitHub Pages**.
* Deploy backend on **Render**, **Railway**, or **DigitalOcean**.
* Secure `.env` files and update production database credentials.
* Enable HTTPS and CORS correctly in production.

---

## Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

Please make sure to update tests as appropriate.

---

## License

This project is licensed under the **MIT License**.

---

## Contact

For any queries or collaborations, reach out at:
**[your-email@example.com](mailto:mmallikarjun4368@gmail.com)**
[GitHub Profile](https://github.com/MMALLIKARJUN2312)

---
