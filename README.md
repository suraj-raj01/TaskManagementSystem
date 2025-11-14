## 📌 Simple Task Management System
A lightweight Task Management System built with modern web technologies.
This application provides task creation, editing, deletion, filtering, prioritization, and user-based access control.

**🚀 Features**

**✅ 1. Task Creation**

Users can create new tasks via a simple form.
Each task includes:

**Title**
- Description
- Due Date
- Status
- Priority (Low, Medium, High)

**✅ 2. Task List (with Pagination & AJAX)**

Tasks are displayed in a paginated list.
Pagination is handled via AJAX for smooth transitions without page reload.
- Each task shows:
- Title
- Status (pending / completed / in-progress)
- Due Date

**✅ 3. Task Details Page**
View complete details of a task, including:
- Title
- Description
- Status
- Due Date
- Priority

**✅ 4. Task Editing**

Users can update:

- Title
- Description
- Due Date
- Priority
- Status

**✅ 5. Task Deletion**

*Users can delete tasks.*
Includes a confirmation dialog before deletion.

**✅ 6. Status Update**

*Users can mark tasks as:*

- Pending
- In-progress
- Completed

**✅ 7. User Authentication & Role-Based Access**

The system includes a basic login/signup authentication flow.
*There are two user roles:*

🔹 Admin

- Can view all users
- Can view all tasks
- Can add/remove users
- Can assign tasks to any user

Access to admin dashboard

🔹 Regular User

Can view only their own tasks
Cannot view or edit other users or their tasks
No access to admin-only pages

**🔐 Access Control**

All pages and actions are protected via role-based authorization:
Tasks can only be accessed by the assigned user or by an admin.

**✅ 8. Priority Management**

Tasks can be moved between priority levels:

- Low
- Medium
- High

Each priority group has its own list.

**🎨 9. Visual Representation**

- Each priority level is color-coded for quick identification.
- UI includes badges and colored labels for:
- Task status
- Priority groups

**🛠️ Technologies Used**

Frontend:
- React / JavaScript / TypeScript
- Axios
- TailwindCSS / ShadCN UI
- React Router
- Lucide Icons

Backend:

- Node.js
- Express.js
- MongoDB / Mongoose

**Authentication:**
- JWT-based authentication
- Role-based Access Control (RBAC)

**📚 API Endpoints (Sample)**
- Authentication
- POST /auth/register
- POST /auth/login

**Tasks**
- GET    /tasks?page=1&limit=10
- GET    /tasks/:id
- POST   /tasks
- PUT    /tasks/:id
- DELETE /tasks/:id
- PATCH  /tasks/:id/status


**Users (Admin Only)**
- GET    /users
- GET    /users/:id
- POST   /users
- DELETE /users/:id


**🔑 Role Permissions**

| Feature               | Admin | Regular User        |
| --------------------- | ----- | ------------------- |
| View all tasks        | ✔️    | ❌                   |
| View own tasks        | ✔️    | ✔️                  |
| Create tasks          | ✔️    | ✔️                  |
| Edit tasks            | ✔️    | ✔️ (only their own) |
| Delete tasks          | ✔️    | ✔️ (only their own) |
| Manage users          | ✔️    | ❌                   |
| Assign tasks to users | ✔️    | ❌                   |


**📦 Installation & Setup**
- 1️⃣ Clone the repository
- git clone https://github.com/your-repo/task-management.git
- cd task-management

2️⃣ Backend Setup
- cd backend
- npm install
- npm run dev

3️⃣ Frontend Setup
- cd frontend
- npm install
- npm run dev

4️⃣ Environment Variables

Create .env files for backend and frontend:

Backend .env
- MONGO_URI=your_mongo_connection
- JWT_SECRET=your_secret_key
- PORT=5000

Frontend .env
VITE_API_URL=http://localhost:5000

🧪 Usage

**Register or login as a user.**

- Admin can create users or manage tasks globally.
- Regular user can see only their own tasks.
- Assign priorities and update statuses.
- View tasks using server-side pagination.

📌 Future Enhancements

- Drag & drop priority board
- Email reminders for due dates
- Activity logs

**Admin analytics dashboard**

**👤 Author**

**SURAJ KUMAR**

- Portfolio link : 
- GitHub : https://github.com/suraj-raj01
- LinkedIn : 