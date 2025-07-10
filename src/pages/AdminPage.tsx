import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, Settings, DollarSign, Trash2, Star, Package } from 'lucide-react'
import { servicesData, Service } from '../data/services'
import toast from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'

interface AdminPageProps {
  user: { email: string } | null
  timeSlots: string[]
  setTimeSlots: React.Dispatch<React.SetStateAction<string[]>>
}

interface Appointment {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  service: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    customerPhone: '(216) 123-4567',
    service: 'Lawn Mowing',
    date: '2024-01-20',
    time: '10:00',
    status: 'pending'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    customerPhone: '(216) 987-6543',
    service: 'Snow Plowing',
    date: '2024-01-22',
    time: '08:00',
    status: 'confirmed'
  }
]

export default function AdminPage({ user, timeSlots, setTimeSlots }: AdminPageProps) {
  // Business Info State
  const [businessInfo, setBusinessInfo] = useState({
    phone1: '(216) 316-7289',
    phone2: '(216) 379-1335',
    email1: 'dniaura@icloud.com',
    email2: 'ethanpmoore@icloud.com',
  })
  const [savingInfo, setSavingInfo] = useState(false)

  // Services State
  const [services, setServices] = useState<Service[]>(servicesData)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [showDeleteId, setShowDeleteId] = useState<string | null>(null)
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    season: 'spring' as const,
    price: 0,
    featured: false,
    isPackage: false
  })

  // Appointments State
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [editingApptId, setEditingApptId] = useState<string | null>(null)
  const [apptStatus, setApptStatus] = useState<'pending'|'confirmed'|'completed'|'cancelled'>('pending')
  const [showDeleteApptId, setShowDeleteApptId] = useState<string | null>(null)

  // Time Slots
  const [newTimeSlot, setNewTimeSlot] = useState('')

  if (!user || user.email !== 'dovinthix@gmail.com') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to access the admin panel.<br />
              Please log in as <span className="font-bold">dovinthix@gmail.com</span> to edit.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.href = '/'}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // --- Business Info ---
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault()
    setSavingInfo(true)
    setTimeout(() => {
      setSavingInfo(false)
      toast.success('Business info saved!')
    }, 800)
  }

  // --- Services ---
  const handleAddService = () => {
    if (!newService.name.trim() || !newService.description.trim()) {
      toast.error('Please fill in all fields')
      return
    }
    if (services.some(s => s.name.toLowerCase() === newService.name.trim().toLowerCase())) {
      toast.error('Service name already exists')
      return
    }
    const service: Service = {
      id: `custom-${Date.now()}`,
      ...newService
    }
    setServices([...services, service])
    setNewService({ name: '', description: '', season: 'spring', price: 0, featured: false, isPackage: false })
    toast.success('Service added successfully!')
  }

  const handleUpdateService = () => {
    if (!editingService) return
    if (!editingService.name.trim() || !editingService.description.trim()) {
      toast.error('Please fill in all fields')
      return
    }
    setServices(services.map(s => s.id === editingService.id ? editingService : s))
    setEditingService(null)
    toast.success('Service updated successfully!')
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id))
    setShowDeleteId(null)
    toast.success('Service deleted successfully!')
  }

  // --- Appointments ---
  const handleEditAppt = (appt: Appointment) => {
    setEditingApptId(appt.id)
    setApptStatus(appt.status)
  }
  const handleUpdateApptStatus = (id: string) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: apptStatus } : a))
    setEditingApptId(null)
    toast.success('Appointment status updated!')
  }
  const handleDeleteAppt = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id))
    setShowDeleteApptId(null)
    toast.success('Appointment deleted!')
  }

  // --- Time Slots ---
  const handleAddTimeSlot = () => {
    if (!newTimeSlot || !/^\d{2}:\d{2}$/.test(newTimeSlot)) {
      toast.error('Please enter a valid time (HH:MM)')
      return
    }
    if (timeSlots.includes(newTimeSlot)) {
      toast.error('Duplicate time slot.')
      return
    }
    setTimeSlots([...timeSlots, newTimeSlot].sort())
    setNewTimeSlot('')
    toast.success('Time slot added!')
  }
  const handleRemoveTimeSlot = (slotToRemove: string) => {
    setTimeSlots(timeSlots.filter(slot => slot !== slotToRemove))
    toast.success('Time slot removed!')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-2 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your Hudson Landscaping website content and appointments
        </p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Services</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
              <Settings className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Appointments</p>
                <p className="text-2xl font-bold">
                  {appointments.filter(a => a.status === 'pending').length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold">{appointments.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue This Month</p>
                <p className="text-2xl font-bold">$2,450</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Manage Services</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* SERVICES TAB */}
        <TabsContent value="services" className="space-y-6">
          <Card className="shadow">
            <CardHeader>
              <CardTitle>Add New Service</CardTitle>
              <CardDescription>
                Create a new service offering for your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input
                    id="serviceName"
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                    placeholder="e.g. Lawn Mowing"
                  />
                </div>
                <div>
                  <Label htmlFor="servicePrice">Price ($)</Label>
                  <Input
                    id="servicePrice"
                    type="number"
                    value={newService.price || ''}
                    onChange={(e) => setNewService({...newService, price: parseFloat(e.target.value) || 0})}
                    placeholder="150"
                  />
                </div>
                <div>
                  <Label htmlFor="serviceSeason">Season</Label>
                  <select
                    id="serviceSeason"
                    value={newService.season}
                    onChange={(e) => setNewService({...newService, season: e.target.value as any})}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="fall">Fall</option>
                    <option value="winter">Winter</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="serviceFeatured">Featured</Label>
                  <input
                    id="serviceFeatured"
                    type="checkbox"
                    checked={newService.featured}
                    onChange={e => setNewService({...newService, featured: e.target.checked})}
                    className="ml-2"
                  />
                </div>
                <div>
                  <Label htmlFor="servicePackage">Is Package</Label>
                  <input
                    id="servicePackage"
                    type="checkbox"
                    checked={newService.isPackage}
                    onChange={e => setNewService({...newService, isPackage: e.target.checked})}
                    className="ml-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="serviceDescription">Description</Label>
                  <Textarea
                    id="serviceDescription"
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                    placeholder="Describe the service..."
                  />
                </div>
              </div>
              <Button onClick={handleAddService} className="mt-4 w-full">
                Add Service
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow">
            <CardHeader>
              <CardTitle>Existing Services</CardTitle>
              <CardDescription>
                Manage your current service offerings ({services.length} total)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {services.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No services found. Add your first service above.</div>
              ) : (
                <div className="space-y-4">
                  {services.slice(0, 10).map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
                      <div className="flex-1">
                        <h4 className="font-medium text-lg text-green-700 flex items-center gap-2">
                          {service.featured && <Star className="w-4 h-4 text-yellow-400" title="Featured" />} 
                          {service.isPackage && <Package className="w-4 h-4 text-purple-500" title="Package" />} 
                          {service.name}
                        </h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="capitalize">
                            {service.season}
                          </Badge>
                          {service.price && (
                            <Badge variant="secondary">
                              ${service.price}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingService(service)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => setShowDeleteId(service.id)}
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* APPOINTMENTS TAB */}
        <TabsContent value="appointments" className="space-y-6">
          <Card className="shadow">
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
              <CardDescription>
                Manage customer appointment requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {appointments.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No appointments yet.</div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
                      <div className="flex-1">
                        <h4 className="font-medium text-green-700">{appointment.customerName}</h4>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                        <p className="text-sm text-gray-600">
                          {appointment.date} at {appointment.time}
                        </p>
                        <p className="text-sm text-gray-600">
                          {appointment.customerPhone} • {appointment.customerEmail}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {editingApptId === appointment.id ? (
                          <>
                            <select
                              value={apptStatus}
                              onChange={e => setApptStatus(e.target.value as any)}
                              className="border rounded px-2 py-1 text-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <Button size="sm" onClick={() => handleUpdateApptStatus(appointment.id)}>
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingApptId(null)}>
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                              {appointment.status}
                            </Badge>
                            <Button variant="outline" size="sm" onClick={() => handleEditAppt(appointment)}>
                              Edit
                            </Button>
                          </>
                        )}
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => setShowDeleteApptId(appointment.id)}
                          title="Delete Appointment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SETTINGS TAB */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="shadow">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your business contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSaveInfo} className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone1">Phone Number 1</Label>
                  <Input id="phone1" value={businessInfo.phone1} onChange={e => setBusinessInfo(info => ({...info, phone1: e.target.value}))} />
                </div>
                <div>
                  <Label htmlFor="phone2">Phone Number 2</Label>
                  <Input id="phone2" value={businessInfo.phone2} onChange={e => setBusinessInfo(info => ({...info, phone2: e.target.value}))} />
                </div>
                <div>
                  <Label htmlFor="email1">Email Address 1</Label>
                  <Input id="email1" value={businessInfo.email1} onChange={e => setBusinessInfo(info => ({...info, email1: e.target.value}))} />
                </div>
                <div>
                  <Label htmlFor="email2">Email Address 2</Label>
                  <Input id="email2" value={businessInfo.email2} onChange={e => setBusinessInfo(info => ({...info, email2: e.target.value}))} />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full" disabled={savingInfo}>
                    {savingInfo ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow">
            <CardHeader>
              <CardTitle>Manage Available Time Slots</CardTitle>
              <CardDescription>
                Add or remove appointment time slots.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Input
                  type="time"
                  value={newTimeSlot}
                  onChange={(e) => setNewTimeSlot(e.target.value)}
                />
                <Button onClick={handleAddTimeSlot}>Add Time</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {timeSlots.length === 0 ? (
                  <span className="text-gray-400">No time slots set.</span>
                ) : (
                  timeSlots.map(slot => (
                    <Badge key={slot} variant="secondary" className="flex items-center gap-2">
                      {slot}
                      <button onClick={() => handleRemoveTimeSlot(slot)} className="ml-1 font-bold text-red-500 hover:text-red-700" title="Remove">
                        &times;
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Service Modal */}
      <AnimatePresence>
        {showDeleteId && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full"
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
            >
              <h3 className="text-lg font-bold mb-2 text-red-600">Delete Service?</h3>
              <p className="mb-4 text-gray-700">Are you sure you want to delete this service? This action cannot be undone.</p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowDeleteId(null)}>Cancel</Button>
                <Button variant="destructive" onClick={() => handleDeleteService(showDeleteId!)}>Delete</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Appointment Modal */}
      <AnimatePresence>
        {showDeleteApptId && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full"
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
            >
              <h3 className="text-lg font-bold mb-2 text-red-600">Delete Appointment?</h3>
              <p className="mb-4 text-gray-700">Are you sure you want to delete this appointment? This action cannot be undone.</p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowDeleteApptId(null)}>Cancel</Button>
                <Button variant="destructive" onClick={() => handleDeleteAppt(showDeleteApptId!)}>Delete</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Service Modal */}
      <AnimatePresence>
        {editingService && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
            >
              <h3 className="text-lg font-bold mb-4 text-green-700">Edit Service</h3>
              <div className="space-y-4">
                <div>
                  <Label>Service Name</Label>
                  <Input
                    value={editingService.name}
                    onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Price ($)</Label>
                  <Input
                    type="number"
                    value={editingService.price || ''}
                    onChange={(e) => setEditingService({...editingService, price: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingService.description}
                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!editingService.featured}
                      onChange={e => setEditingService({...editingService, featured: e.target.checked})}
                    />
                    <Star className="w-4 h-4 text-yellow-400" /> Featured
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!editingService.isPackage}
                      onChange={e => setEditingService({...editingService, isPackage: e.target.checked})}
                    />
                    <Package className="w-4 h-4 text-purple-500" /> Package
                  </label>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button onClick={handleUpdateService}>Save</Button>
                  <Button variant="outline" onClick={() => setEditingService(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}