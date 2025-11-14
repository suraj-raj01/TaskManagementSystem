import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../API";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CircleCheck, Hourglass, Loader } from "lucide-react";

const UserView = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [taskFilter, setTaskFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const filteredTasks = user?.tasks?.filter((task: any) => {
    if (taskFilter === "all") return true;
    return task.status === taskFilter;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [taskFilter]);

  // apply pagination here
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks?.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks?.length / tasksPerPage);


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
    <div className="p-3 max-w-full rounded-md">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>

      <div className="border p-4 w-fit rounded-md mb-6 ">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User Type:</strong> {user.userType}</p>
        <p><strong>User ID:</strong> {user._id}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Tasks</h2>

      {/* Filter Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-3 mb-4">
        <Button size='sm' onClick={() => setTaskFilter("all")} className={`px-3 py-1 cursor-pointer rounded ${taskFilter === "all" ? "bg-accent-foreground " : "bg-card-foreground/50"}`}>
          All
        </Button>
        <Button size='sm' onClick={() => setTaskFilter("completed")} className={`px-3 cursor-pointer py-1 rounded ${taskFilter === "completed" ? "bg-accent-foreground " : "bg-card-foreground/50"}`}>
          <CircleCheck /> Completed
        </Button>
        <Button size='sm' onClick={() => setTaskFilter("in-progress")} className={`px-3 cursor-pointer py-1 rounded ${taskFilter === "in-progress" ? "bg-accent-foreground " : "bg-card-foreground/50"}`}>
          <Loader /> In-Progress
        </Button>
        <Button size='sm' onClick={() => setTaskFilter("pending")} className={`px-3 py-1 cursor-pointer rounded ${taskFilter === "pending" ? "bg-accent-foreground " : "bg-card-foreground/50"}`}>
          <Hourglass /> Pending
        </Button>
      </div>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentTasks.map((task: any) => (
            <div key={task._id} className="border p-3 rounded-md ">
              <h3 className="font-bold text-md mb-2">{task.title}</h3>
              <p><strong>Description:</strong> {task.description}</p>

              <span className="flex items-center justify-start gap-2">
                <strong>Status:</strong>
                <Badge
                  className={`w-fit text-xs pb-1 font-semibold rounded-sm ${task.status === "completed"
                    ? "bg-green-500"
                    : task.status === "in-progress"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                    }`}
                >
                  {task.status}
                </Badge>
              </span>
              <p><strong>Due Date :</strong> {task.dueDate}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No tasks found for this filter.</p>
      )}
      {totalPages >= 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between content-between w-full gap-3 mt-4">
          <div className="text-center md:text-start">
            Page {currentPage} of {totalPages}
          </div>
         <div className="flex items-center justify-center md:justify-end gap-3 w-full">
           {/* Prev Button */}
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            size="sm"
          >
            Prev
          </Button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? "default" : "secondary"}
              onClick={() => setCurrentPage(i + 1)}
              className="cursor-pointer"
            >
              {i + 1}
            </Button>
          ))}

          {/* Next Button */}
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            size="sm"
          >
            Next
          </Button>

         </div>
        </div>
      )}

    </div>
  );
};

export default UserView;
