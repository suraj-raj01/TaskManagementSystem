import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Plus, User } from "lucide-react"

const Home = () => {
  return (
    <div className="flex flex-col min-h-120 w-full items-center justify-center p-0 md:p-6">
      <h1 className="font-bold text-xl md:text-4xl text-center">TASK MANAGEMENT SYSTEM</h1>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-2 gap-4">
        <Button className="rounded-sm w-full" asChild><Link to="/register"><Plus className="h-4 w-4" />New User</Link></Button>
        <Button className="rounded-sm w-full" asChild><Link to="/login"><User className="h-4 w-4" />Login</Link></Button>
      </div>
    </div>
  )
}

export default Home