import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Navbar() {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav
      style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)' }}
      className="sticky top-0 z-50"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif font-bold text-xl focus:outline-none focus:ring-2" style={{ color: 'var(--color-text)' }}>
          Wave<span style={{ color: 'var(--color-accent)' }}>Stack</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {userEmail ? (
            <>
              <Link to="/dashboard" className="font-mono text-sm focus:outline-none focus:ring-2" style={{ color: 'var(--color-text-secondary)' }}>Dashboard</Link>
              <button
                onClick={handleSignOut}
                className="font-mono text-sm px-4 py-2 rounded min-h-[44px] focus:outline-none focus:ring-2"
                style={{ color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-mono text-sm focus:outline-none focus:ring-2" style={{ color: 'var(--color-text-secondary)' }}>Sign in</Link>
              <Link
                to="/signup"
                className="font-mono text-sm px-4 py-2 rounded min-h-[44px] inline-flex items-center focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded focus:outline-none focus:ring-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ color: 'var(--color-text)' }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
          {userEmail ? (
            <>
              <Link to="/dashboard" className="font-mono text-sm py-2" style={{ color: 'var(--color-text)' }} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button onClick={() => { handleSignOut(); setMenuOpen(false) }} className="font-mono text-sm text-left py-2" style={{ color: 'var(--color-text-secondary)' }}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-mono text-sm py-2" style={{ color: 'var(--color-text)' }} onClick={() => setMenuOpen(false)}>Sign in</Link>
              <Link to="/signup" className="font-mono text-sm py-2" style={{ color: 'var(--color-accent)' }} onClick={() => setMenuOpen(false)}>Get started free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
