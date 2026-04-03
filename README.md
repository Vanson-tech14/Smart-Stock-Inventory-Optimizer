# Smart Stock Inventory Optimization - Backend

This is the backend server for the Smart Stock Inventory Optimization application, built with Node.js and Express.

## Tech Stack
- Node.js
- Express.js
- CORS
- JSON-based persistence (No database required)

## Folder Structure
- `server.js`: Main entry point
- `routes/`: Modular API routes
- `data/`: JSON files for dummy data

## Setup and Running

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   Or for development (with auto-reload):
   ```bash
   npm run dev
   ```

4. **Verify**:
   Open [http://localhost:5000](http://localhost:5000) in your browser. You should see "Server is running".

## API Endpoints

### Authentication
- `POST /login`: Login with email and password.
  - Credentials: `admin@gmail.com` / `1234`

### Products
- `GET /products`: Fetch all products.
- `POST /products`: Add a new product.
- `DELETE /products/:id`: Delete a product by ID.

### Dashboard & Analytics
- `GET /dashboard`: Summary statistics (total products, low stock, revenue).
- `GET /alerts`: Products with low stock (< 50).
- `GET /analytics`: Monthly sales data.

### Settings
- `GET /settings`: Fetch application settings.
- `POST /settings`: Update application settings.
