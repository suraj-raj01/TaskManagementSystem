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
import { Trash, MoreHorizontal, Eye } from 'lucide-react'
import { Skeleton } from '../components/ui/skeleton'
import { useNavigate } from 'react-router-dom'
import api from "../API"
import { toast } from 'sonner'



export default function Users() {
  const [users, setUsers] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const fetchUsers = async () => {
    try {
      setLoading(true)
      let response
      if (searchQuery) {
        response = await axios.post(`${api}/users/search/${searchQuery}`)
        setUsers(response?.data?.users || [])
        // console.log(response.data, "search data");
      } else {
        response = await axios.get(`${api}/users/get?page=${page}&limit=5`)
        setUsers(response?.data?.users || [])
        console.log("users data", response.data)
        const { data } = response
        setPageCount(data.totalPages || 1)
        setPage(data.currentPage || 1)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [page,searchQuery])


  const deleteUser = async (id: any) => {
    try {
      const res = await axios.delete(`${api}/users/${id}`)
      // console.log(res.data,'data')
      toast.success(res.data.message || 'User deleted successfully')
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user. Please try again.')
    }
  }

  const navigate = useNavigate();
  const viewpage = (id: any) => {
    navigate(`/dashboard/userview/${id}`)
  }


  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'name',
      header: "Name",
    },
    {
      accessorKey: 'email',
      header: "Email",
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
              View User
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteUser(row.original._id)}>
              <Trash className="mr-2 h-4 w-4" />
              Delete User
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
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <p className="text-muted-foreground">
                  Manage and track all the users
                </p>
              </div>
            </>
          )}
        </div>
        {loading ? (
          <Skeleton className="h-10 w-32" />
        ) : (
          <Button onClick={() => { navigate("/dashboard/create-user") }}>
            Create Users
          </Button>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <DataTable
          columns={columns}
          data={users}
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