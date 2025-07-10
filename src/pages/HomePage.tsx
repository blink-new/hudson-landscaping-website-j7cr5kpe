import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Snowflake, Sun, Leaf, TreePine, Phone, Mail } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-blue-800 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Hudson Landscaping
            <span className="block text-blue-200">& Snow Services</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Professional landscaping and snow removal services for all seasons. 
            Transform your property with our expert care and attention to detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 text-lg">
              <Link to="/booking">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Appointment
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-3 text-lg">
              <Link to="/services">
                View Our Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Seasonal Services Overview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Year-Round Services</h2>
          <p className="text-gray-600 text-center mb-16 text-lg">
            We provide comprehensive landscaping and maintenance services throughout all seasons
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-700">Spring</CardTitle>
                <CardDescription>Fresh starts and new growth</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Prepare your landscape for the growing season with our spring cleanup and planting services.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/services?season=spring">View Spring Services</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <Sun className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-yellow-700">Summer</CardTitle>
                <CardDescription>Maintenance and care</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Keep your property looking its best with regular maintenance and irrigation services.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/services?season=summer">View Summer Services</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <TreePine className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-orange-700">Fall</CardTitle>
                <CardDescription>Preparation and cleanup</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Prepare your landscape for winter with leaf removal and seasonal preparations.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/services?season=fall">View Fall Services</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Snowflake className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">Winter</CardTitle>
                <CardDescription>Snow removal and protection</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Professional snow removal and winter protection services to keep your property safe.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/services?season=winter">View Winter Services</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-gray-600 mb-12 text-lg">
            Ready to transform your property? Contact us today for a free consultation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-lg">Phone Numbers</h3>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">(216) 316-7289</p>
                <p className="text-lg font-medium">(216) 379-1335</p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-lg">Email Addresses</h3>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-lg">dniaura@iCloud.com</p>
                <p className="text-lg">ethanpmoore@iCloud.com</p>
              </div>
            </Card>
          </div>

          <div className="mt-12">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg">
              <Link to="/booking">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Your Appointment
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}