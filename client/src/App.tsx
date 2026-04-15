import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Layout = lazy(()=>import("./layout"))
const DashboardLayout = lazy(()=>import("./dashboardLayout"))
const ChatLayout = lazy(()=>import("./chats/ChatLayout"))

const LoadingPage = lazy(()=>import("./components/loadingPage"))
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Tasks = lazy(() => import("./pages/Tasks"));
const CreateTask = lazy(() => import("./pages/CreateTask"));
const EditTask = lazy(() => import("./pages/EditTask"));
const Taskview = lazy(() => import("./pages/Taskview"));
const AssignTask = lazy(() => import("./pages/AssignTask"));
const Users = lazy(() => import("./pages/Users"));
const UserView = lazy(() => import("./pages/UserView"));
const CreateUsers = lazy(() =>
  import("./pages/CreateUser").then(module => ({
    default: module.CreateUsers,
  }))
);

const PageNotFound = lazy(() => import("./PageNotFound"));

const ChatRoom = lazy(() => import("./chats/ChatRoom"));
const RegisterForm = lazy(() => import("./auth/Register").then(module=>({
  default:module.RegisterForm,
})));


const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div><LoadingPage/></div>}>
        <Routes>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="admin-register" element={<RegisterForm />} />
            <Route path="*" element={<PageNotFound />} />
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
            <Route path="*" element={<PageNotFound />} />
          </Route>

          <Route path="chatting" element={<ChatLayout />}>
            <Route index element={<ChatRoom />} />
            <Route path="chat" element={<ChatRoom />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
