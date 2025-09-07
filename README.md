e-commerce is a fully functional single-page e-commerce web application built with a Node.js/Express backend and vanilla JavaScript frontend. This project demonstrates a complete shopping experience with user authentication, product browsing, and cart functionality.

Features
Backend Features
JWT Authentication: Secure user signup and login with JSON Web Tokens

Product API: RESTful endpoints for retrieving products with filtering options

Cart Management: API endpoints for cart operations

Data Persistence: In-memory storage for users and products

Frontend Features
User Authentication: Sign up and login forms with validation

Product Catalog: Browse products with category and price filtering

Shopping Cart: Add/remove items with persistent storage

Responsive Design: Mobile-friendly interface with modern UI components

Tech Stack
Backend: Node.js, Express.js, JWT, bcryptjs, CORS

Frontend: Vanilla JavaScript, HTML5, CSS3

Authentication: JSON Web Tokens (JWT)

Data Storage: In-memory storage (can be extended to database)

Project Structure
ecommerce-app/
├── public/
│   └── index.html          # Frontend application
├── server.js               # Backend server
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
Authentication
POST /api/signup - Create a new user account

POST /api/login - Authenticate user and return JWT token

GET /api/verify - Verify JWT token (protected)

Products
GET /api/items - Get all products (with optional filtering)

GET /api/items/:id - Get specific product details

Cart
POST /api/cart - Add item to cart (protected)

Usage
Create an Account: Click on "Login" then "Sign up" to create a new account

Browse Products: View products on the home page or products page

Filter Products: Use category and price filters to find specific items

Add to Cart: Click "Add to Cart" on any product

View Cart: Click the cart icon to view and manage your cart
