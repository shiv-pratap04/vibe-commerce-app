# 🛍️ Vibe Commerce - Mock E-Com Cart

A full-stack **shopping cart application** built as part of the **Vibe Commerce screening assignment**.  
This project demonstrates a complete e-commerce flow using the **MERN stack** — allowing users to view products, add/remove items from their cart, and simulate a checkout process.

---

## 🛠️ Tech Stack

**Frontend**
- React  
- Redux Toolkit  
- React Router  
- TailwindCSS  

**Backend**
- Node.js  
- Express  

**Database**
- MongoDB (via Mongoose)

**API Type**
- REST API

---

## 🚀 Getting Started

> You need Node.js (v14+), npm, and access to a MongoDB instance (Atlas or local).

### 1️⃣ Backend Setup

```bash
# open terminal 1
cd backend
npm install
Create a .env file inside backend/ with the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string_here


Start the backend (example uses nodemon script):

npm run dev
# or
node server.js


Backend will run at: http://localhost:5000

2️⃣ Frontend Setup
# open terminal 2
cd frontend
npm install
npm start


Frontend runs at: http://localhost:3000

📦 Available Scripts
Backend

npm run dev — start server with nodemon (development)

npm start — start server (production)

Frontend

npm start — runs React app in development

npm run build — builds production bundle

📦 API Endpoints
Method	Endpoint	Description
GET	/api/products	Fetch all products (populates DB from Fake Store API if empty).
GET	/api/cart	Fetch items in cart.
POST	/api/cart	Add a product to cart. Expects product object in request body.
DELETE	/api/cart/:id	Remove a product from cart by product ID.
POST	/api/checkout	Simulate checkout: clears cart and returns mock receipt.
