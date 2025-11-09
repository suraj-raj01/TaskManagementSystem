import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { Card } from "../components/ui/card";
import api from "../API";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../components/ui/skeleton";

export default function CreateTask() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      status: "pending",
      priority: "medium",
    },
  });

  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).user._id : null;
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await axios.post(`${api}/tasks/create`, { ...data, userId });
      toast.success("Task created successfully!");
      reset();
      navigate("/dashboard/tasks");
    } catch (error) {
      toast.error("Error creating task");
    } finally {
      setLoading(false);
    }
  };

  return (
   <section className=" p-3">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <div>
          {loading ? (
            <>
              <Skeleton className="h-9 w-32 mb-2" />
              <Skeleton className="h-5 w-48" />
            </>
          ) : (
            <>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                <p className="text-muted-foreground">
                  Manage and track all the tasks
                </p>
              </div>
            </>
          )}
        </div>
        {loading ? (
          <Skeleton className="h-10 w-32" />
        ) : (
          <Button onClick={() => { navigate("/dashboard/tasks") }}>
           See All Tasks
          </Button>
        )}
      </div>
     <Card className="max-w-full rounded-sm mt-10 mx-auto w-md md:w-lg lg:w-3xl p-4">
        <h1 className="text-2xl font-bold text-center">Create Task</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
        <Label className='pb-2'>Title</Label>
        <Input {...register("title", { required: true })} placeholder="Enter task title" />
      </div>

      <div>
        <Label className="pb-2">Description</Label>
        <Textarea {...register("description", { required: true })} placeholder="Enter task description" />
      </div>

      <div>
        <Label className='pb-2'>Due Date</Label>
        <Input {...register("dueDate", { required: true })} type="date" />
      </div>

      <div>
        <Label className='pb-2'>Status</Label>
        <Select onValueChange={(val) => setValue("status", val)} defaultValue="pending">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className='pb-2'>Priority</Label>
        <Select onValueChange={(val) => setValue("priority", val)} defaultValue="medium">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      </section>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating..." : "Create Task"}
      </Button>
    </form>
    </Card>
   </section>
  );
}
