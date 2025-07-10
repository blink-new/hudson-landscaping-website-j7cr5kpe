import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { blink } from './lib/blink'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import BookingPage from './pages/BookingPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeSlots, setTimeSlots] = useState([
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ])

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-green-600">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header user={user} />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/booking" element={<BookingPage timeSlots={timeSlots} />} />
            <Route path="/admin" element={<AdminPage user={user} timeSlots={timeSlots} setTimeSlots={setTimeSlots} />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App