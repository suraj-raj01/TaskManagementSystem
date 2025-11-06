import { usePathname } from "next/navigation"
import { Menu, LogOut} from "lucide-react"
import { Button } from "./components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"
import { ModeToggle } from "./components/Theme"
import { useEffect, useState } from "react"
import { cn } from "./lib/utils"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  // const router = useNavigate();
  const logout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
    window.location.href = '/';
  }
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setEmail(parsedUser?.user.name)
    } else {
      console.log("No user in localStorage");
    }
  }, []);

  const navLinks = [
    { name: "Dashboard", to: "/" },
    { name: "Tasks", to: "/tasks" },
    { name: "Teams", to: "/teams" },
    { name: "Reports", to: "/reports" },
  ]

  return (
    <nav className="px-5 w-full border-b bg-background/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-full mx-auto flex items-center justify-between px-4 py-3">
        {/* Left - Logo */}
        <Link to="/" className="text-xl font-semibold tracking-tight">
          TaskFlow Management
        </Link>

        {/* Right - Theme + Profile */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {/* Profile Dropdown */}
          <DropdownMenu>
              {
                email ? (
                  <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <span className="sr-only">User Menu</span>
                    {email.charAt(0).toUpperCase()}
                  </Button>
            </DropdownMenuTrigger>
                ) : (
                  <Button variant="outline" className="rounded-xs">
                    <Link to="/login" className="flex items-center gap-2">
                      Login
                    </Link>
                  </Button>
                )}
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={logout} >
                <LogOut className="h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="flex flex-col p-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={cn(
                  "text-sm font-medium py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === link.to
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
