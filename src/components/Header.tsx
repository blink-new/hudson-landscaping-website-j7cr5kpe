import { Button } from "@/components/ui/button"
import { TreePine, Calendar, Settings, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { blink } from "@/lib/blink"

interface HeaderProps {
  user: { email: string; id: string } | null
}

export default function Header({ user }: HeaderProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    blink.auth.logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <TreePine className="w-8 h-8 text-green-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Hudson Landscaping</h1>
              <p className="text-xs text-gray-500">& Snow Services</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-green-600 font-medium">
              Services
            </Link>
            <Link to="/booking" className="text-gray-700 hover:text-green-600 font-medium">
              Book Appointment
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Welcome, {user.email}
                </span>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                  <Link to="/booking">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">
                    Admin Login
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}