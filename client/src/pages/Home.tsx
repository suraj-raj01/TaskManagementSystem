import { Link } from "react-router-dom"
import { Plus, User } from "lucide-react"
import { AuroraText } from "../components/ui/aurora-text"
import { Ripple } from "../components/ui/ripple"
import { RainbowButton } from "../components/ui/rainbow-button"

const Home = () => {
  return (
      <div className="bg-background relative flex h-160 w-full flex-col items-center justify-center overflow-hidden border-none rounded-lg border">
      <h1 className="font-bold text-xl md:text-5xl text-center"> <AuroraText>TASK MANAGEMENT SYSTEM</AuroraText></h1>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-2 gap-4">
        <RainbowButton asChild><Link to="/register"><Plus className="h-4 w-4" />New User</Link></RainbowButton>
        <RainbowButton asChild><Link to="/login"><User className="h-4 w-4" />Login</Link></RainbowButton>
      </div>
      <Ripple />
    </div>
  )
}

export default Home