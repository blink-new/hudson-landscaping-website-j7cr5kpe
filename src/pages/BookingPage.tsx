import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon, Clock, Users } from 'lucide-react'
import { servicesData } from '../data/services'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ]

  useEffect(() => {
    const serviceId = searchParams.get('service')
    if (serviceId) {
      setSelectedService(serviceId)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDate || !selectedTime || !selectedService || !customerName || !customerEmail || !customerPhone) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      toast.success('Appointment request submitted! We will contact you shortly to confirm.')
      
      setSelectedDate(new Date())
      setSelectedTime('')
      setSelectedService('')
      setCustomerName('')
      setCustomerEmail('')
      setCustomerPhone('')
      setNotes('')
    } catch (error) {
      toast.error('Failed to submit appointment request')
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedServiceData = servicesData.find(s => s.id === selectedService)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Schedule Your Appointment</h1>
        <p className="text-lg text-gray-600">Choose your service or package, select a date and time, and we'll confirm.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarIcon className="w-5 h-5" /> Select Date & Time</CardTitle>
            <CardDescription>Choose your preferred appointment date and time.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Select Date</Label>
              <div className="mt-2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                  className="rounded-md border"
                />
              </div>
            </div>

            {selectedDate && (
              <div>
                <Label className="text-base font-medium flex items-center gap-2"><Clock className="w-4 h-4" /> Select Time</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>Provide your information and service details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="service">Service / Package *</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service or package" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicesData.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Your full name" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="(216) 123-4567" required />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="your.email@example.com" required />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special instructions..." />
              </div>

              {selectedServiceData && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-green-800">{selectedServiceData.name}</h4>
                    <p className="text-sm text-green-700">{selectedServiceData.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      {selectedServiceData.priceType === 'fixed' ? (
                        <p className="text-lg font-bold text-green-800">Price: ${selectedServiceData.price}</p>
                      ) : (
                        <p className="text-lg font-bold text-green-800">Price: ${selectedServiceData.price}/hr per person</p>
                      )}
                      {selectedServiceData.personnel && (
                        <div className="flex items-center gap-1 text-sm text-green-700">
                          <Users className="w-4 h-4" />
                          <span>{selectedServiceData.personnel} Person{selectedServiceData.personnel > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedDate && selectedTime && (
                <Card className="bg-blue-50 border-blue-200 mt-4">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-blue-800">Appointment Summary</h4>
                    <p className="text-sm text-blue-700">Date: {format(selectedDate, 'EEEE, MMMM do, yyyy')}</p>
                    <p className="text-sm text-blue-700">Time: {selectedTime}</p>
                  </CardContent>
                </Card>
              )}

              <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Request Appointment'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
