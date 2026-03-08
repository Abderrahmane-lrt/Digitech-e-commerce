# Digitech E-Commerce Platform

A sleek, premium, full-stack e-commerce application built with a modern technology-focused brand identity. Digitech combines a powerful Laravel backend with a high-performance React frontend to deliver a seamless shopping experience.

---

## 🚀 Overview

Digitech is designed for users who appreciate cutting-edge technology and aesthetic excellence. It features a complete shopping lifecycle, from product discovery and cart management to secure checkout and administrative oversight.

### 🎨 Design Philosophy
- **Modern Aesthetics**: Glassmorphism, vibrant gradients, and deep contrast typography.
- **Dynamic Themes**: Fully responsive system with both **Light** (default) and **Dark** modes.
- **Micro-Animations**: Smooth transitions, hover effects, and interactive background elements (DotGrid).

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS & DaisyUI
- **Icons**: Lucide React
- **Auth**: Laravel Sanctum (Token-based)
- **State Management**: React Hooks & Context API

### Backend
- **Framework**: Laravel 11
- **Database**: MySQL
- **Authentication**: Laravel Sanctum
- **Filesystem**: Local storage with symbolic link integration for image uploads

---

## ✨ Key Features

### 👤 User Features
- **Account Management**:
  - Secure registration and login.
  - Comphrensive profile dashboard (View, Edit, Delete account).
- **Shopping Experience**:
  - Dynamic product catalog with advanced filtering.
  - Interactive **Cart Platform** (Add, Update Quantity, Remove).
  - Secure **Checkout Flow** with order creation.
- **Order History**: Personal dashboard to track previous purchases and order statuses.

### 🔐 Administrative Tools
- **Admin Dashboard**: High-level overview of store performance with quick-action navigation.
- **Inventory Management**:
  - Full CRUD operations for products.
  - **Image Upload System**: Drag-and-drop support with real-time previews.
- **Global Order Tracking**: Centralized view of all customer orders with status management.

### 🎨 UI Refinements
- **Centralized Storage URL**: Robust image resolution across all environments.
- **Full-Bleed Visuals**: Product images utilize `object-cover` for a premium, retail-grade look.
- **Responsive Navbar**: Floating glassmorphic design that adapts to user authentication state and theme preferences.

---

## 📦 Setup & Installation

### Backend
1. `cd backend`
2. `composer install`
3. `cp .env.example .env` (Configure your database)
4. `php artisan migrate --seed`
5. `php artisan storage:link`
6. `php artisan serve`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

## 📜 Recent Updates
- **v1.2**: Switched images to `object-cover` for 100% container coverage.
- **v1.1**: Centralized API and Storage URL resolution for Docker/Sail compatibility.
- **v1.0**: Initial release with full Admin/User functionality.
