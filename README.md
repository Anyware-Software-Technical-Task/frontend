# 🚀 Anywhere Exams - Full Stack Application System

A modern, responsive educational platform built with cutting-edge technologies, demonstrating enterprise-level architecture, best practices, and comprehensive testing strategies.

## 🎯 Project Overview

This is a complete full-stack application showcasing advanced React/TypeScript development with a robust Node.js/Express backend. The platform manages educational content including announcements, quizzes, and provides real-time analytics through interactive dashboards.

## 🛠️ Technology Stack

### Frontend

- **React 19** with TypeScript for type-safe development
- **Vite** for lightning-fast development and optimized builds
- **Redux Toolkit** for state management with async thunks
- **React Router v7** with protected routes and layout system
- **Material-UI (MUI) v7** for professional UI components
- **MUI X Charts** for interactive data visualization
- **Tailwind CSS v4** for utility-first styling
- **Framer Motion** for smooth animations and transitions
- **Axios** for HTTP client with interceptors
- **Vitest + Testing Library** for comprehensive testing

### Backend

- **Node.js** with Express.js framework
- **TypeScript** for type safety and better developer experience
- **MongoDB** with Mongoose ODM for data persistence
- **JWT** for secure authentication
- **Zod** for runtime type validation
- **CORS** configuration for secure cross-origin requests
- **Error handling middleware** for robust error management

### Development Tools

- **ESLint** with TypeScript and React rules
- **Git** for version control
- **Comprehensive testing suite** with unit tests

## 🏗️ Architecture Highlights

### Frontend Architecture

```
src/
├── api/               # Axios instance and HTTP configuration
├── components/        # Reusable UI components (NavBar, Sidebar)
├── features/          # Feature-based organization (Redux Toolkit)
│   ├── auth/         # Authentication logic with Redux Toolkit
│   ├── announcements/ # Announcements API and types
│   └── quizzes/      # Quizzes API and types
├── hoc/              # Higher-order components (RequireAuth)
├── layout/           # Layout components (MainLayout, DashboardLayout)
├── pages/            # Page components (Dashboard, Login, etc.)
├── routes/           # Route definitions (AppRoutes)
├── store/            # Redux store configuration
```

### Backend Architecture

```
src/
├── controllers/      # Business logic handlers (CRUD operations)
├── middlewares/      # Express middlewares (error handling)
├── models/          # MongoDB schemas (Announcement, Quiz)
├── routes/          # API route definitions
├── utils/           # Utility functions (database seeding)
└── validators/      # Request validation schemas
```

## ✨ Key Features Implemented

### 🔐 Authentication & Authorization

- JWT-based authentication system with environment-based credentials
- Protected routes with RequireAuth HOC
- Secure token storage in localStorage
- Automatic token injection in API requests via Axios interceptors

### 📊 Interactive Dashboard

- Real-time data visualization with MUI X Charts
- Bar charts for quiz distribution by course
- Pie charts for announcement categorization by role
- Responsive stat cards with live data from backend

### 📢 Content Management

- **Announcements System**: Read-only display of announcements with role-based categorization
- **Quiz Management**: Read-only display of quizzes with course and topic filtering
- **Role-based Content**: Content categorization (math, physics, management, events, other)

### 🎨 Modern UI/UX

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for delightful page transitions
- **Professional Styling**: Material-UI components with custom theming
- **Loading States**: Proper loading indicators and error handling

### 🧪 Comprehensive Testing

- **Unit Tests**: Redux slices with async thunks and state management
- **API Tests**: Service layer testing with mocked HTTP requests
- **Test Coverage**: Vitest configuration with jsdom environment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=5000
# LOGIN_EMAIL=test@anyware.com
# LOGIN_PASSWORD=123456

npm run dev
```

### Frontend Setup

```bash
cd frontend/vite-project
npm install
npm run dev
```

### Running Tests

```bash
# Frontend tests
npm test
```

## 📈 Performance Optimizations

### Frontend

- **Code Splitting**: Route-based organization
- **Bundle Optimization**: Vite's efficient bundling
- **State Management**: Efficient Redux patterns with async thunks
- **HTTP Optimization**: Axios interceptors for token management

### Backend

- **Error Handling**: Comprehensive error middleware
- **Validation**: Runtime type checking with Zod
- **CORS Configuration**: Secure cross-origin requests
- **Database Seeding**: Automated data population

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth with 2-hour expiration
- **Protected Routes**: Client-side route protection with RequireAuth HOC
- **Input Validation**: Environment-based credential validation
- **CORS Configuration**: Proper cross-origin request handling
- **Error Sanitization**: Safe error responses

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive layouts for tablets
- **Desktop Experience**: Enhanced features for larger screens
- **Touch-Friendly**: Optimized touch interactions

## 🌐 Internationalization

- **i18next Integration**: Ready for multiple languages

## 🎯 Why This Project Stands Out

### Technical Excellence

- **Modern Stack**: Latest versions of all technologies
- **Type Safety**: Full TypeScript implementation
- **Best Practices**: Industry-standard patterns and conventions
- **Scalable Architecture**: Feature-based organization

### Code Quality

- **Clean Code**: Readable, maintainable, and well-documented
- **Error Handling**: Comprehensive error management
- **Performance**: Optimized for speed and efficiency
- **Security**: Industry-standard security practices

This project demonstrates my expertise in:

- **Full-Stack Development**: React, Node.js, MongoDB
- **Modern JavaScript/TypeScript**: ES6+, TypeScript
- **State Management**: Redux Toolkit with async thunks
- **UI/UX Design**: Material-UI, Tailwind CSS, Framer Motion
- **Testing**: Unit Testing with Vitest
- **Security**: Authentication, authorization, and data protection

Ready to bring this level of technical excellence to your team! 🚀
