import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError('Those credentials did not match. Check your email and password.')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-md">
        <h1 className="font-serif font-bold text-4xl mb-2" style={{ color: 'var(--color-text)' }}>Welcome back.</h1>
        <p className="font-mono mb-8" style={{ color: 'var(--color-text-secondary)' }}>Sign in to your WaveStack account.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div role="alert" aria-live="polite" className="p-4 rounded font-mono text-sm" style={{ backgroundColor: 'rgba(248,113,113,0.12)', color: 'var(--color-error)', border: '1px solid var(--color-error)' }}>
              {error}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-mono text-sm font-medium" style={{ color: 'var(--color-text)' }}>Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-mono px-4 py-3 rounded min-h-[44px] focus:outline-none focus:ring-2"
              style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-text)', border: '1px solid var(--color-border)', focusRingColor: 'var(--color-accent)' }}
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-mono text-sm font-medium" style={{ color: 'var(--color-text)' }}>Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-mono px-4 py-3 rounded min-h-[44px] focus:outline-none focus:ring-2"
              style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="font-mono font-medium py-3 px-6 rounded min-h-[44px] transition-all duration-150 hover:scale-[1.01] active:scale-[0.98] focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="font-mono text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
          No account?{' '}
          <Link to="/signup" className="underline focus:outline-none focus:ring-2" style={{ color: 'var(--color-accent)' }}>Create one free</Link>
        </p>
      </div>
    </div>
  )
}
