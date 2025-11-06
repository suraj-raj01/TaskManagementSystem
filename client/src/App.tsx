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

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<PageNotFound/>}/>
      </Route>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="taskview/:id" element={<Taskview />} />
        <Route path="create-task" element={<CreateTask />} />
        <Route path="updatetask/:id" element={<EditTask />} />
        <Route path="*" element={<PageNotFound/>}/>
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App