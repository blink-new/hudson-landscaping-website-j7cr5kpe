import { TreePine, Phone, Mail } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TreePine className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-xl font-bold">Hudson Landscaping</h3>
                <p className="text-sm text-gray-400">& Snow Services</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Professional landscaping and snow removal services for all seasons. 
              Your trusted partner in property maintenance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-green-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-green-400 transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-green-400 transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-gray-300">(216) 316-7289</p>
                  <p className="text-gray-300">(216) 379-1335</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-gray-300">dniaura@iCloud.com</p>
                  <p className="text-gray-300">ethanpmoore@iCloud.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Hudson Landscaping & Snow Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}