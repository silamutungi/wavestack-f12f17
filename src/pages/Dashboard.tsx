import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { type Beat, type AnalyticsSummary } from '../types'

const TABS = ['My Beats', 'Analytics', 'Licenses', 'Collabs', 'Settings'] as const
type Tab = typeof TABS[number]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('My Beats')
  const [beats, setBeats] = useState<Beat[]>([])
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [userName, setUserName] = useState('Producer')

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.user_metadata?.display_name) setUserName(user.user_metadata.display_name)
      const { data, error: fetchError } = await supabase
        .from('beats')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(50)
      if (fetchError) {
        setError('Could not load your beats. Please refresh to try again.')
        setLoading(false)
        return
      }
      const beatList = (data ?? []) as Beat[]
      setBeats(beatList)
      setSummary({
        total_beats: beatList.length,
        total_plays: beatList.reduce((s, b) => s + b.plays, 0),
        total_sales: beatList.reduce((s, b) => s + b.sales, 0),
        total_revenue: beatList.reduce((s, b) => s + b.sales * b.price_basic, 0)
      })
      setLoading(false)
    }
    load()
  }, [])

  async function handleDeleteBeat(id: string) {
    if (!window.confirm('Remove this beat from your store? This cannot be undone without contacting support.')) return
    await supabase.from('beats').update({ deleted_at: new Date().toISOString() }).eq('id', id)
    setBeats((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="font-mono text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>Dashboard</p>
          <h1 className="font-serif font-bold text-4xl" style={{ color: 'var(--color-text)' }}>Hey, {userName}.</h1>
        </div>

        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-10" style={{ backgroundColor: 'var(--color-border)' }}>
            {[
              { label: 'Beats', value: summary.total_beats },
              { label: 'Plays', value: summary.total_plays },
              { label: 'Sales', value: summary.total_sales },
              { label: 'Revenue', value: new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(summary.total_revenue) }
            ].map((stat) => (
              <div key={stat.label} className="p-6" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</p>
                <p className="font-serif font-bold text-3xl" style={{ color: 'var(--color-text)' }}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-1 mb-8 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-mono text-sm px-4 py-2 rounded min-h-[44px] transition-colors focus:outline-none focus:ring-2"
              style={{
                backgroundColor: activeTab === tab ? 'var(--color-accent)' : 'var(--color-bg-muted)',
                color: activeTab === tab ? '#ffffff' : 'var(--color-text-secondary)'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded animate-pulse" style={{ backgroundColor: 'var(--color-bg-muted)' }} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div role="alert" aria-live="polite" className="p-6 rounded font-mono" style={{ backgroundColor: 'rgba(248,113,113,0.12)', color: 'var(--color-error)', border: '1px solid var(--color-error)' }}>
            {error}
            <button onClick={() => window.location.reload()} className="ml-4 underline">Retry</button>
          </div>
        )}

        {!loading && !error && activeTab === 'My Beats' && (
          <div>
            {beats.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-5xl mb-6">🎹</p>
                <h2 className="font-serif font-semibold text-2xl mb-3" style={{ color: 'var(--color-text)' }}>No beats yet</h2>
                <p className="font-mono mb-6" style={{ color: 'var(--color-text-secondary)' }}>Upload your first beat and start earning.</p>
                <button className="font-mono px-6 py-3 rounded min-h-[44px] focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}>Upload a beat</button>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                {beats.map((beat) => (
                  <div key={beat.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-semibold text-lg truncate" style={{ color: 'var(--color-text)' }}>{beat.title}</p>
                      <p className="font-mono text-sm" style={{ color: 'var(--color-text-secondary)' }}>{beat.genre} &bull; {beat.bpm} BPM &bull; {beat.key}</p>
                    </div>
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="font-mono text-xs" style={{ color: 'var(--color-text-secondary)' }}>Plays</p>
                        <p className="font-mono font-medium" style={{ color: 'var(--color-text)' }}>{beat.plays}</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="font-mono text-xs" style={{ color: 'var(--color-text-secondary)' }}>Sales</p>
                        <p className="font-mono font-medium" style={{ color: 'var(--color-text)' }}>{beat.sales}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs" style={{ color: 'var(--color-text-secondary)' }}>From</p>
                        <p className="font-mono font-medium" style={{ color: 'var(--color-accent)' }}>{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(beat.price_basic)}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteBeat(beat.id)}
                        aria-label={`Remove ${beat.title} from store`}
                        className="font-mono text-xs px-3 py-2 rounded min-h-[44px] focus:outline-none focus:ring-2"
                        style={{ color: 'var(--color-error)', border: '1px solid var(--color-error)' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!loading && !error && activeTab === 'Analytics' && (
          <div className="py-12 text-center">
            <p className="text-5xl mb-6">📊</p>
            <h2 className="font-serif font-semibold text-2xl mb-3" style={{ color: 'var(--color-text)' }}>Analytics coming soon</h2>
            <p className="font-mono" style={{ color: 'var(--color-text-secondary)' }}>Detailed play-through rates, conversion data, and revenue charts will appear here.</p>
          </div>
        )}

        {!loading && !error && activeTab === 'Licenses' && (
          <div className="py-12 text-center">
            <p className="text-5xl mb-6">📄</p>
            <h2 className="font-serif font-semibold text-2xl mb-3" style={{ color: 'var(--color-text)' }}>No licenses yet</h2>
            <p className="font-mono" style={{ color: 'var(--color-text-secondary)' }}>When an artist purchases one of your beats, the license agreement will appear here.</p>
          </div>
        )}

        {!loading && !error && activeTab === 'Collabs' && (
          <div className="py-12 text-center">
            <p className="text-5xl mb-6">🤝</p>
            <h2 className="font-serif font-semibold text-2xl mb-3" style={{ color: 'var(--color-text)' }}>No collab requests yet</h2>
            <p className="font-mono" style={{ color: 'var(--color-text-secondary)' }}>Artists who want to collaborate on your beats will send requests here.</p>
          </div>
        )}

        {!loading && !error && activeTab === 'Settings' && (
          <div className="max-w-lg">
            <h2 className="font-serif font-semibold text-2xl mb-6" style={{ color: 'var(--color-text)' }}>Account settings</h2>
            <div className="p-6 rounded mb-4" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
              <p className="font-mono text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>Producer name</p>
              <p className="font-mono font-medium" style={{ color: 'var(--color-text)' }}>{userName}</p>
            </div>
            <button
              onClick={async () => { await supabase.auth.signOut(); window.location.href = '/' }}
              className="font-mono text-sm px-4 py-3 rounded min-h-[44px] focus:outline-none focus:ring-2"
              style={{ color: 'var(--color-error)', border: '1px solid var(--color-error)' }}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
