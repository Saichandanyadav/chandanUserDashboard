# Chandan User Management Dashboard

![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.15.0-green?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey?logo=express&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0.6-green?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

A full-featured **User Management Dashboard** built with **React.js** (frontend) and **Node.js + Express** (backend). The app allows users to **view, add, edit, and delete users** with responsive, mobile-friendly UI, along with advanced filtering, sorting, and search functionalities.

## Features

- **User Listing**
  - Grid layout with search and filter options
  - Sort by Name, Company, City, or Recently Added
  - Mobile-friendly filters with icons
- **Add / Edit User**
  - Single form component handles both adding and editing users
  - Auto-fetch coordinates from Zip code
  - Validation for required fields
- **User Details**
  - View individual user information
- **Responsive Design**
  - Optimized for desktop, tablet, and mobile
- **Notifications**
  - Success and error notifications using `react-toastify`
- **Persistent Data**
  - Backend API stores all user information

## Tech Stack

- **Frontend:** React.js, React Router, Axios, React Icons, React Toastify
- **Backend:** Node.js, Express.js, MongoDB
- **Styling:** CSS with responsive design
- **Utilities:** OpenCage API for geolocation

## Folder Structure

```

chandan-user-management-dashboard/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── chandan-frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── README.md
└── package.json

````

## Installation

### Backend
```bash
cd backend
npm install
npm run dev
````

### Frontend

```bash
cd chandan-frontend
npm install
npm start
```

## Usage

1. Open the dashboard in your browser: `http://localhost:3000`
2. Navigate to **Users** to view all users
3. Use **Search**, **Filter**, and **Reset** options
4. Click **Add User** to create a new user
5. Click a user to **view details**
6. Click **Edit** to update user information

## API Endpoints

* `GET /users` - Get all users
* `POST /users` - Add new user
* `GET /users/:id` - Get user by ID
* `PUT /users/:id` - Update user by ID
* `DELETE /users/:id` - Delete user by ID

## Dependencies

* `react`
* `react-router-dom`
* `axios`
* `react-toastify`
* `react-icons`
* `express`
* `mongoose`
* `dotenv`

## License

This project is **open-source** and available under the MIT License.
