# MERN Stack User Management App

> Full Stack Intern Assessment Task — Bits and Volts Pvt. Ltd.

---

## 📌 Overview

A full-stack MERN application for managing user information with full CRUD operations, search, pagination, CSV export, and responsive design.

---

## 🚀 Features

- ✅ List all users with pagination
- ✅ Add new user with profile image (Base64)
- ✅ Edit existing user details
- ✅ View user profile page
- ✅ Delete user with confirmation
- ✅ Search users by name, email, or location
- ✅ Export users to CSV
- ✅ Toggle Active / InActive status directly from table
- ✅ Form validation on all fields
- ✅ Toast notifications for success and error
- ✅ Fully responsive (Mobile + Desktop)

---

## 🛠️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React.js, React Router, Axios     |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB, Mongoose                 |
| Styling   | CSS Modules                       |
| Notifications | React Toastify               |
| Build Tool | Vite                             |

---

## 📁 Project Structure

```
mern-task/
├── backend/
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── .env
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── ConfirmModal.jsx
        │   ├── Navbar.jsx
        │   ├── Pagination.jsx
        │   ├── SearchBar.jsx
        │   └── UserTable.jsx
        ├── pages/
        │   ├── AddEditPage.jsx
        │   ├── ListPage.jsx
        │   └── ViewPage.jsx
        ├── services/
        │   └── api.js
        ├── App.jsx
        ├── index.css
        └── main.jsx
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-task.git
cd mern-task
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mernTask
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | `/api/users`                | Get all users (paginated)|
| GET    | `/api/users/:id`            | Get single user          |
| GET    | `/api/users/search?q=`      | Search users             |
| GET    | `/api/users/export`         | Export users to CSV      |
| POST   | `/api/users`                | Create new user          |
| PUT    | `/api/users/:id`            | Update user              |
| PATCH  | `/api/users/:id/status`     | Toggle user status       |
| DELETE | `/api/users/:id`            | Delete user              |

---

## ✅ Validation Rules

| Field       | Rule                                      |
|-------------|-------------------------------------------|
| First Name  | Required, min 2 chars, letters only       |
| Last Name   | Required, min 2 chars, letters only       |
| Email       | Required, valid email format, unique      |
| Mobile      | Required, exactly 10 digits               |
| Gender      | Required (Male / Female)                  |
| Status      | Required (Active / InActive)              |
| Location    | Required                                  |
| Profile Img | Optional, JPG/PNG/WEBP, max 2MB           |

---

## 📸 Screenshots

### List Page
- Search bar, Add User, Export to CSV
- Table with status toggle and action menu (View / Edit / Delete)

### Add / Edit Form
- Two-column responsive form
- Profile image preview
- Field validation with error messages

### View Page
- Profile card with gradient header
- All user details with icons

---

## 🌐 Deployment

| Layer    | Platform  | URL                        |
|----------|-----------|----------------------------|
| Frontend | Netlify   | https://your-app.netlify.app |
| Backend  | Render    | https://your-api.render.com  |

---

## 📦 Environment Variables

### Backend `.env`

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend — update `src/services/api.js` for production:

```js
const API = axios.create({
  baseURL: "https://your-api.render.com/api",
});
```

---

## 👩‍💻 Author

**Ruchika**
Full Stack Intern Assessment — Bits and Volts Pvt. Ltd., Pune

---

## 📄 License

This project is built for assessment purposes only.