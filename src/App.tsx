import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-[60vh] font-mono" style={{ color: 'var(--color-text)' }}>
                <p className="text-8xl font-serif font-bold mb-4">404</p>
                <p className="text-xl mb-8" style={{ color: 'var(--color-text-secondary)' }}>This page does not exist.</p>
                <a href="/" className="px-6 py-3 rounded font-mono font-medium min-h-[44px] flex items-center" style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}>Back to home</a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
