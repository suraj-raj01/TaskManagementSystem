import { useEffect, useState } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { DataTable } from '../components/ui/data-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Button } from '../components/ui/button'
import { Trash, Edit, MoreHorizontal, Eye } from 'lucide-react'
import { Skeleton } from '../components/ui/skeleton'
import { Badge } from '../components/ui/badge'
import { useNavigate } from 'react-router-dom'
import api from "../API"
import { toast } from 'sonner'



export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const user = localStorage.getItem("user");
  const id = user ? JSON.parse(user).user._id : null;

  const fetchCategories = async () => {
    try {
      setLoading(true)
      let response
      if (searchQuery) {
        response = await axios.get(`${api}/users/search/${searchQuery}`)
        setTasks(response?.data?.category || [])
        console.log(response.data, "search data");
      } else {
        response = await axios.get(`${api}/users/${id}?page=${page}&limit=6`)
        console.log("tasks data", response.data)
        setTasks(response?.data?.user?.tasks || [])
        setPage(response?.data?.pagination?.currentPage || 1)
        setPageCount(response?.data?.pagination.totalPages || 1)
        console.log(response?.data?.pagination.totalPages,'totalpages')
      }
      // const { data } = response
      // setPage(data?.pagination?.currentPage || 1)
      // setPageCount(data?.pagination.totalPages || 1)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [page,searchQuery])


  const deleteTask = async (id: any) => {
    try {
      await axios.delete(`${api}/tasks/delete/${id}`)
      toast.success('Task deleted successfully')
      fetchCategories();
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('Failed to delete task. Please try again.')
    }
  }

  const navigate = useNavigate();
  const viewpage = (id: any) => {
    navigate(`/dashboard/taskview/${id}`)
  }


  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'title',
      header: "Title Name",
    },
    {
      accessorKey: 'description',
      header: "Description",
    },
    {
      accessorKey: 'dueDate',
      header: "Due Date",
      cell: ({ row }) => {
        const dueDate = new Date(row.original.dueDate);
        return dueDate.toLocaleDateString();
      },
    },
    {
      accessorKey: 'priority',
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.original.priority;
        let colorClass = "";

        if (priority === "high") {
          colorClass = "bg-red-500 text-white";
        } else if (priority === "medium") {
          colorClass = "bg-yellow-500 text-white";
        } else if (priority === "low") {
          colorClass = "bg-green-500 text-white";
        }

        return (
          <Badge className={`${colorClass} capitalize`}>
            {priority}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'status',
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        let colorClass = "";

        if (status === "completed") {
          colorClass = "bg-green-500 text-white";
        } else if (status === "in-progress") {
          colorClass = "bg-gray-500 text-white";
        } else if (status === "pending") {
          colorClass = "bg-red-500 text-white";
        }

        return (
          <Badge className={`${colorClass} capitalize`}>
            {status}
          </Badge>
        );
      },
    },

    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-2">
              <MoreHorizontal className="h-4 w-4" />
              {/* <span className="hidden sm:inline">Actions</span> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => viewpage(row.original._id)}>
              <Eye className="mr-2 h-4 w-4" />
              View Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/dashboard/updatetask/${row.original._id}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteTask(row.original._id)}>
              <Trash className="mr-2 h-4 w-4" />
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]


  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <section className="p-3">
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
          <Button onClick={() => { navigate("/dashboard/create-task") }}>
            Create Task
          </Button>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <DataTable
          columns={columns}
          data={tasks}
          pageCount={pageCount}
          currentPage={page}
          onPageChange={setPage}
          onSearch={handleSearch}
          isLoading={loading}
        />
      </div>
    </section>
  )
}