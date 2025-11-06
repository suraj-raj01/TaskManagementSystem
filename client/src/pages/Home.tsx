import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Plus, User } from "lucide-react"

const Home = () => {
  return (
    <div className="flex flex-col min-h-100 items-center justify-center p-6 md:p-6">
      <h1 className="font-bold text-4xl">TASK MANAGEMENT SYSTEM</h1>
      <div className="mt-4 flex gap-4">
        <Button className="rounded-xs" asChild><Link to="/register"><Plus className="h-4 w-4" />New User</Link></Button>
        <Button className="rounded-xs" asChild><Link to="/login"><User className="h-4 w-4" />Login</Link></Button>
      </div>
    </div>
  )
}

export default Home