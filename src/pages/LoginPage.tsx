import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TreePine, Lock, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.username || !formData.password) {
      toast.error("Please enter username and password")
      return
    }

    setIsLoading(true)

    try {
      // Simple admin login check (in a real app, this would be more secure)
      if (formData.username === "admin" && formData.password === "hudson2024") {
        // Simulate login process
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // In a real app, you'd use proper authentication
        // For now, we'll just redirect and show success
        toast.success("Login successful!")
        navigate("/admin")
      } else {
        toast.error("Invalid username or password")
      }
    } catch (error) {
      toast.error("Login failed. Please try again.")
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TreePine className="w-10 h-10 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hudson Landscaping</h1>
              <p className="text-sm text-gray-500">& Snow Services</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Admin Login</h2>
          <p className="text-gray-500">Access the admin dashboard</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Admin Access</span>
            </CardTitle>
            <CardDescription>
              Enter your admin credentials to manage the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="Enter username"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Demo Credentials</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>Username:</strong> admin</p>
                <p><strong>Password:</strong> hudson2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{" "}
            <a href="mailto:dniaura@iCloud.com" className="text-green-600 hover:underline">
              dniaura@iCloud.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}