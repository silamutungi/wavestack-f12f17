import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }
    if (displayName.trim().length < 2) {
      setError('Please enter your producer name (at least 2 characters).')
      return
    }
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } }
    })
    setLoading(false)
    if (authError) {
      setError('Could not create your account. Try again or use a different email.')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-md">
        <h1 className="font-serif font-bold text-4xl mb-2" style={{ color: 'var(--color-text)' }}>Join WaveStack.</h1>
        <p className="font-mono mb-8" style={{ color: 'var(--color-text-secondary)' }}>Free forever. Start selling beats today.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div role="alert" aria-live="polite" className="p-4 rounded font-mono text-sm" style={{ backgroundColor: 'rgba(248,113,113,0.12)', color: 'var(--color-error)', border: '1px solid var(--color-error)' }}>
              {error}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="displayName" className="font-mono text-sm font-medium" style={{ color: 'var(--color-text)' }}>Producer name</label>
            <input
              id="displayName"
              type="text"
              required
              maxLength={50}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="font-mono px-4 py-3 rounded min-h-[44px] focus:outline-none focus:ring-2"
              style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
              placeholder="e.g. Metro J"
            />
          </div>
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
              style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-mono text-sm font-medium" style={{ color: 'var(--color-text)' }}>Password</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-mono px-4 py-3 rounded min-h-[44px] focus:outline-none focus:ring-2"
              style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
              placeholder="8+ characters"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="font-mono font-medium py-3 px-6 rounded min-h-[44px] transition-all duration-150 hover:scale-[1.01] active:scale-[0.98] focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
          >
            {loading ? 'Creating account...' : 'Create free account'}
          </button>
        </form>
        <p className="font-mono text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" className="underline focus:outline-none focus:ring-2" style={{ color: 'var(--color-accent)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
