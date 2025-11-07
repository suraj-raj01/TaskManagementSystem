import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../API";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge";

const UserView = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/users/${id}`);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to fetch user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="p-6 text-center">User not found</div>;
  }

  return (
    <div className="p-6 max-w-full  shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>

      <div className="border p-4 w-fit rounded-md mb-6 ">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User Type:</strong> {user.userType}</p>
        <p><strong>User ID:</strong> {user._id}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Tasks</h2>
      {user.tasks && user.tasks.length > 0 ? (
        <div className="space-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {user.tasks.map((task: any) => (
            <div key={task._id} className="border p-4 rounded-md ">
              <h3 className="font-bold text-lg mb-2">{task.title}</h3>
              <p><strong>Description:</strong> {task.description}</p>
              <span className="flex items-center justify-start gap-2"> <strong>Status:</strong>
                <Badge className={`flex items-center w-fit text-xs pb-1 justify-center font-semibold rounded-full  ${
                  task.status === "completed"
                    ? "bg-green-500"
                    : task.status === "in-progress"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}>
                 {task.status}
                </Badge>
              </span>
              {/* <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}</p> */}
            </div>
          ))}
        </div>
      ) : (
        <p>They have not any Tasks</p>
      )}
    </div>
  );
};

export default UserView;
