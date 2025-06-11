# ✈️ Airport Management System

A learning backend project built with **NestJS**, **GraphQL**, and **Sequelize** to manage airport operations such as flights, bags, passengers, roles, and notifications. The system follows clean architecture principles and leverages modern tooling to ensure scalability, performance, and maintainability.

---

## 📫 Postman Collection

You can find the Postman collection in [postman/airport.postman_collection.json](https://www.postman.com/vortex-1744/workspace/eyad/collection/6845606e6d6bd3301c7b050a?action=share&creator=39034446&active-environment=39034446-8dc2af14-a681-4e01-a78d-1c20881f03f3)


---

## 🚀 Tech Stack

- **NestJS** – Scalable and extensible Node.js framework
- **TypeScript** – Strictly typed development experience
- **GraphQL** – API query language with real-time support (Subscriptions)
- **Sequelize** – Promise-based ORM for PostgreSQL
- **PostgreSQL** – Relational database
- **Redis + BullMQ** – Background jobs, queues, and email notification processing
- **DataLoader** – Batching & caching for solving N+1 GraphQL queries
- **Docker** – Containerization and local environment setup

---

## 📈 ER Diagram

![ER Diagram](https://raw.githubusercontent.com/Eyad-AbdElMohsen/Airport-Management-System/main/data.png)

---

## 📦 Features

### 🧱 Architecture & Patterns
- **Repository Pattern**: Isolates data access logic for cleaner, testable code
- **Modular Structure**: Organized and scalable codebase
- **Custom Decorators & Guards**: For cleaner and reusable logic

### 🔐 Authentication & Authorization
- **Role-Based Access Control**: Admin, Passenger, Staff.
- **JWT**: Access and refresh tokens
- **Verification Code Flow**: During signup
- **Auth Guards**: For both authentication and role-based authorization

### 📊 GraphQL Performance
- **DataLoader**: Solves N+1 problems efficiently
- **Subscriptions**: Real-time updates for:
  - Flight status changes
  - Bag status changes

### 📬 Email Notifications
- **BullMQ + Redis**: Queue-based job processing
- Emails sent on:
  - Status changes
  - Verification codes

### 🛠 Database & ORM
- **Hooks**: Actions after creation/update, e.g. triggering notifications
- **Transactions**: Ensures consistency; either all DB actions succeed or none

### 🔍 Dynamic API Features

The system includes a fully dynamic API layer designed to work with any model in the database.

Features include:
- **Filtering**: Clients can pass flexible filter conditions to query only relevant data.
- **Sorting**: Sort by any field in ascending or descending order.
- **Pagination**: Both offset-based and cursor-based (optional) pagination to manage large datasets.

---

## 🧩 Others

- **Custom Validations**: Implemented for model-specific and business-specific rules.
- **GraphQL Error Handling**: Consistent error structures and messages returned through GraphQL responses.

---

## 🛠 Getting Started (Locally)

1. Clone the repository
2. Create a `.env` file
3. Run the app with Docker:
```bash
docker-compose build
docker-compose up
