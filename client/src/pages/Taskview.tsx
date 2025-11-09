import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../API";
import axios from "axios";
import { Card } from "../components/ui/card";

export default function Taskview() {
    const id = useParams().id;
    const [task, setTask] = useState<any>(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${api}/tasks/get/${id}`);
                setTask(response.data.task);
                // console.log(response.data, 'data')
            } catch (error) {
                console.log(error);
            }
        };
        fetchTask();
    }, [id]);

    return (
        <div className="md:p-2">
            {task ? (
                <Card className="max-w-md rounded-sm shadow-md p-3 border">
                    <h2 className="font-semibold text-2xl text-gray-800 dark:text-gray-100">
                        {task?.title || "Untitled Task"}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {task?.description || "No description provided."}
                    </p>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700 dark:text-gray-400">Status:</span>
                            <span className={`px-2 py-1 rounded-sm text-xs font-semibold ${task?.status === "completed" ? "bg-green-100 text-green-700" :
                                    task?.status === "in progress" ? "bg-yellow-100 text-yellow-700" :
                                        "bg-gray-100 text-gray-700"
                                }`}>
                                {task?.status || "Unknown"}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700 dark:text-gray-400">Priority:</span>
                            <span className={`px-2 py-1 rounded-sm text-xs font-semibold ${task?.priority === "high" ? "bg-red-100 text-red-700" :
                                    task?.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                                        "bg-green-100 text-green-700"
                                }`}>
                                {task?.priority || "N/A"}
                            </span>
                        </div>

                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Due Date:</span>
                            <span>{task?.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</span>
                        </div>

                        {/* <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Created At:</span>
                            <span>{task?.createdAt ? new Date(task.createdAt).toLocaleDateString() : "N/A"}</span>
                        </div>

                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Updated At:</span>
                            <span>{task?.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : "N/A"}</span>
                        </div> */}
                    </div>
                </Card>

            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}


