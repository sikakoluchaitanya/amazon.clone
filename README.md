# Amazon Clone - E-Commerce Platform

A full-stack e-commerce application that closely replicates Amazon's design and user experience. Built with Next.js, Express.js, PostgreSQL, and Clerk authentication.

![Amazon Clone](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800)

## 🚀 Live Demo

- **Frontend**: [Vercel Deployment URL]
- **Backend API**: [Render Deployment URL]

## ✨ Features

### Core E-Commerce
- **Product Catalog** - 194 products across 24 categories (fetched from DummyJSON API)
- **Product Details** - Image gallery, specifications, ratings, related products, reviews section
- **Shopping Cart** - Add/remove items, quantity updates, persistent cart
- **Wishlist** - Save products for later
- **Checkout** - Shipping address form with order summary
- **Order Management** - Place orders and view order history
- **Email Notifications** - Order confirmation emails via Gmail SMTP

### Authentication
- **Clerk Integration** - Sign in required for checkout only
- **Email-based Auth** - Order confirmations sent to user's email
- **Guest Browsing** - Browse products and add to cart without signing in

### Amazon-like UI
- **Hero Carousel** - Auto-sliding banner with navigation
- **Deal Cards** - 2x2 product grids for featured categories
- **Product Carousels** - Horizontal scrolling product sections
- **Dynamic Categories** - Search bar dropdown with all categories
- **Responsive Design** - Mobile, tablet, and desktop optimized

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL with Sequelize ORM |
| Authentication | Clerk |
| Email | Nodemailer with Gmail SMTP |
| Deployment | Vercel (Frontend), Render (Backend + DB) |

## 📁 Project Structure

```
amazon-clone/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # API request handlers
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # Express routes
│   │   ├── middleware/     # Error handling
│   │   ├── seeds/          # Dynamic product seeder
│   │   └── services/       # Email service
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   ├── components/    # UI components (Header, HeroCarousel, ProductCarousel, etc.)
│   │   ├── context/       # React Context (Cart, Wishlist)
│   │   └── services/      # API client
│   └── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Clerk account (for authentication)
- Gmail account (for email notifications)

### 1. Clone the Repository
```bash
git clone https://github.com/sikakoluchaitanya/amazon.clone.git
cd amazon.clone
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE amazon_clone;"

# Configure environment
cp .env.example .env
```

Edit `.env` with your credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=amazon_clone
DB_USER=postgres
DB_PASSWORD=your_password
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
```

```bash
# Start the server (auto-seeds on first run)
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Configure environment
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

```bash
# Start the development server
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## 📡 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products with search, category, pagination |
| GET | `/api/products/:id` | Get product details with images |
| GET | `/api/categories` | List all categories |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:id` | Update quantity |
| DELETE | `/api/cart/:id` | Remove item |

### Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wishlist` | Get wishlist items |
| POST | `/api/wishlist` | Add to wishlist |
| DELETE | `/api/wishlist/:id` | Remove from wishlist |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place order (sends confirmation email) |
| GET | `/api/orders` | Get order history |
| GET | `/api/orders/:id` | Get order details |

## 🗄 Database Schema

- **Users** - Customer information
- **Categories** - 24 product categories
- **Products** - 194 products from DummyJSON API
- **ProductImages** - Multiple images per product
- **CartItems** - User cart items
- **WishlistItems** - User wishlist items
- **Orders** - Order information with shipping
- **OrderItems** - Products in each order

## 🌐 Deployment

### Backend (Render)
1. Create PostgreSQL database on Render
2. Create Web Service pointing to `backend/` folder
3. Set environment variables (DB credentials, Gmail, etc.)
4. Deploy - database auto-seeds on first start

### Frontend (Vercel)
1. Import repository to Vercel
2. Set root directory to `frontend/`
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api`
   - Clerk keys
4. Deploy

## 📝 Key Implementation Details

### Dynamic Product Seeding
- Fetches 194 products from DummyJSON API on startup
- Creates 24 categories automatically
- Smart seeding: only seeds if database is empty
- Products include realistic images, prices, and descriptions

### Authentication Flow
- Users can browse and add to cart without signing in
- Sign-in required only at checkout
- Uses Clerk modal for seamless authentication
- Order confirmation sent to user's email

### Email Notifications
- Order confirmation emails with order details
- HTML email templates
- Gmail SMTP integration

## 📜 Scripts

### Backend
```bash
npm run dev          # Start with nodemon (auto-seeds)
npm run start        # Production start
npm run seed:dynamic # Manually seed database
npm run seed:force   # Force re-seed (clears existing data)
```

### Frontend
```bash
npm run dev    # Development server
npm run build  # Production build
npm run start  # Start production server
```

## 👤 Author

Built by [Chaitanya Sikakolu](https://github.com/sikakoluchaitanya) for Scaler SDE Intern Fullstack Assignment
