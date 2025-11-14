import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./layout"
import DashboardLayout from "./dashboardLayout"
import Register from "./pages/Register"
import PageNotFound from "./PageNotFound"
import Profile from "./pages/Profile"
import Tasks from "./pages/Tasks"
import CreateTask from "./pages/CreateTask"
import Login from "./pages/Login"
import EditTask from "./pages/EditTask"
import Taskview from "./pages/Taskview"
import { RegisterForm } from "./auth/Register"
import Users from "./pages/Users"
import UserView from "./pages/UserView"
import {CreateUsers} from "./pages/CreateUser"
import Dashboard from "./pages/Dashboard"
import ChatRoom from "./chats/ChatRoom"
import ChatLayout from './chats/ChatLayout';
import AssignTask from "./pages/AssignTask"

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin-register" element={<RegisterForm/>} />
        <Route path="*" element={<PageNotFound/>}/>
      </Route>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="users" element={<Users />} />
        <Route path="taskview/:id" element={<Taskview />} />
        <Route path="assigntask/:id" element={<AssignTask />} />
        <Route path="userview/:id" element={<UserView />} />
        <Route path="create-task" element={<CreateTask />} />
        <Route path="create-user" element={<CreateUsers />} />
        <Route path="updatetask/:id" element={<EditTask />} />
        <Route path="*" element={<PageNotFound/>}/>
      </Route>
      <Route path="chatting" element={<ChatLayout />}>
        <Route index element={<ChatRoom />} />
        <Route path="chat" element={<ChatRoom />} />
        <Route path="*" element={<PageNotFound/>}/>
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App