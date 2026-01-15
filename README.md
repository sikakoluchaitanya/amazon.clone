# Amazon Clone - E-Commerce Platform

A full-stack e-commerce application that closely replicates Amazon's design and user experience. Built with Next.js, Express.js, and PostgreSQL.

![Amazon Clone Screenshot](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800)

## Features

### Core Features
- **Product Listing** - Grid layout with search, category filters, and pagination
- **Product Details** - Image carousel, specifications, ratings, and reviews count
- **Shopping Cart** - Add/remove items, quantity updates, cart totals
- **Checkout** - Shipping address form with order summary
- **Order Management** - Place orders and view order history

### UI/UX
- Amazon-inspired dark blue header with search bar
- Yellow/orange action buttons matching Amazon's color scheme
- Responsive design for mobile, tablet, and desktop
- Product cards with hover effects and rating stars
- Loading skeletons for better UX

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL with Sequelize ORM |
| State | React Context API |

## Project Structure

```
Scaler_Assignment1/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # API request handlers
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # Express routes
│   │   ├── middleware/     # Error handling
│   │   └── seeds/          # Database seeders
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context providers
│   │   └── services/      # API client
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Scaler_Assignment1
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE amazon_clone;"

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Seed the database
npm run seed

# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Configure environment
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start the development server
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products with filters |
| GET | `/api/products/:id` | Get product details |
| GET | `/api/categories` | List all categories |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:id` | Update quantity |
| DELETE | `/api/cart/:id` | Remove item |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place order |
| GET | `/api/orders` | Get order history |
| GET | `/api/orders/:id` | Get order details |

## Database Schema

- **Users** - Customer information
- **Categories** - Product categories (5 categories)
- **Products** - Product catalog (21 products)
- **ProductImages** - Multiple images per product
- **CartItems** - User cart items
- **Orders** - Order information with shipping
- **OrderItems** - Products in each order

## Assumptions

1. A default user (ID: 1) is always logged in - no authentication required
2. Product images use Unsplash URLs for demonstration
3. No payment gateway - orders are placed directly
4. Free shipping on all orders

## Sample Data

The seed script creates:
- 5 Categories: Electronics, Clothing, Home & Kitchen, Books, Sports & Outdoors
- 21 Products with realistic prices, descriptions, and specifications
- Multiple product images for carousel functionality

## Scripts

### Backend
```bash
npm run dev    # Start with nodemon
npm run start  # Production start
npm run seed   # Seed database
```

### Frontend
```bash
npm run dev    # Development server
npm run build  # Production build
npm run start  # Start production server
```

## Author
Built for Scaler SDE Intern Fullstack Assignment
