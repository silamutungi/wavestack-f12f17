import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ backgroundColor: 'var(--color-bg-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-serif font-bold text-lg mb-1" style={{ color: 'var(--color-text)' }}>
              Wave<span style={{ color: 'var(--color-accent)' }}>Stack</span>
            </p>
            <p className="font-mono text-sm" style={{ color: 'var(--color-text-secondary)' }}>Where producers sell beats and artists find their sound.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link to="/" className="font-mono text-sm focus:outline-none focus:ring-2" style={{ color: 'var(--color-text-secondary)' }}>Home</Link>
            <Link to="/dashboard" className="font-mono text-sm focus:outline-none focus:ring-2" style={{ color: 'var(--color-text-secondary)' }}>Dashboard</Link>
            <Link to="/privacy" className="font-mono text-sm focus:outline-none focus:ring-2" style={{ color: 'var(--color-text-secondary)' }}>Privacy</Link>
            <Link to="/terms" className="font-mono text-sm focus:outline-none focus:ring-2" style={{ color: 'var(--color-text-secondary)' }}>Terms</Link>
            <a href="mailto:support@wavestack.app" className="font-mono text-sm focus:outline-none focus:ring-2" style={{ color: 'var(--color-text-secondary)' }}>Contact</a>
          </div>
        </div>
        <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>&copy; {year} WaveStack. All rights reserved. Producers keep 80% of every sale.</p>
        </div>
      </div>
    </footer>
  )
}
