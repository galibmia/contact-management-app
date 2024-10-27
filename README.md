
# Contact Management App

A React-based application for managing contacts, built with Vite and utilizing the MERN stack for backend services. This app allows users to view, add, update, and delete contacts, as well as mark contacts as favorites.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- View all contacts
- Add new contacts
- Update existing contacts
- Delete contacts
- Mark contacts as favorites
- Filter contacts by favorites

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Express.js, MongoDB
- **Deployment**: Vercel (for backend), and Netlify (or any static hosting for frontend)

## Getting Started

Follow these steps to set up the application on your local machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/galibmia/contact-management-app.git
   cd contact-management-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port specified in the terminal).

3. Make sure to set up the backend server as mentioned in the backend documentation. The frontend will make API calls to the specified backend URL.

### API Endpoints

The application interacts with the following API endpoints:

- **GET /contacts**: Fetch all contacts
- **POST /contacts**: Add a new contact
- **PUT /contacts/:id**: Update an existing contact
- **DELETE /contacts/:id**: Delete a contact

Ensure you have the backend server running and accessible to the frontend.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
