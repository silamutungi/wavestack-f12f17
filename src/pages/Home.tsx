import { useNavigate } from 'react-router-dom'

const HERO_URL = 'https://gudiuktjzynkjvtqmuvi.supabase.co/storage/v1/object/public/hero-images/ebfc6303-a673-409c-8346-2ba9f228fd15-hero.png'

const FEATURES = [
  { icon: '🎵', title: 'Beat Marketplace', body: 'List your beats with basic, premium, and exclusive license tiers. Buyers get instant downloads.' },
  { icon: '📄', title: 'Flexible Licensing', body: 'Set your own terms for non-exclusive and exclusive deals. Built-in contract generation on every sale.' },
  { icon: '🤝', title: 'Artist Collaboration', body: 'Send and receive collab requests directly on any beat. Build your network one track at a time.' },
  { icon: '📊', title: 'Sales Analytics', body: 'Track plays, conversions, and revenue from your dashboard. Know exactly what your catalog earns.' },
  { icon: '☁️', title: 'Cloud Storage', body: 'Upload stems, project files, and WAVs. Your entire catalog lives safely in the cloud.' },
  { icon: '🔗', title: 'Direct Connections', body: 'Artists reach producers without middlemen. Every deal is transparent, fast, and fair.' },
]

export default function Home() {
  const navigate = useNavigate()
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${HERO_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="relative min-h-screen flex items-center overflow-hidden"
        aria-label="Hero section"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,13,11,0.92) 0%, rgba(232,69,26,0.25) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <p className="font-mono text-sm tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--color-accent)' }}>Beat Marketplace</p>
          <h1 className="font-serif font-bold text-5xl md:text-7xl leading-tight mb-6" style={{ color: 'var(--color-text)' }}>
            Your sound.<br />Your terms.<br />Your income.
          </h1>
          <p className="font-mono text-lg md:text-xl mb-10 max-w-xl" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
            WaveStack connects independent producers with artists who need heat. Sell beats, set licensing terms, and get paid without giving up control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="font-mono font-medium px-8 py-4 rounded min-h-[44px] min-w-[180px] transition-all duration-150 hover:scale-[1.02] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff',}}
            >
              Start selling free
            </button>
            <button
              onClick={() => navigate('/login')}
              className="font-mono font-medium px-8 py-4 rounded min-h-[44px] min-w-[180px] border-2 transition-all duration-150 hover:scale-[1.02] active:scale-[0.97] focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--color-text-secondary)', color: 'var(--color-text)' }}
            >
              Browse beats
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-serif font-bold text-4xl md:text-5xl mb-4" style={{ color: 'var(--color-text)' }}>Everything you need to run your music business.</h2>
            <p className="font-mono text-lg" style={{ color: 'var(--color-text-secondary)' }}>From your first beat sale to a full catalog.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--color-border)' }}>
            {FEATURES.map((f) => (
              <div key={f.title} className="p-8" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-serif font-semibold text-xl mb-3" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                <p className="font-mono text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-6" style={{ color: 'var(--color-text)' }}>Ready to get paid for your craft?</h2>
          <p className="font-mono text-lg mb-10" style={{ color: 'var(--color-text-secondary)' }}>Free to join. No monthly fees. You keep 80% of every sale.</p>
          <button
            onClick={() => navigate('/signup')}
            className="font-mono font-medium px-10 py-4 rounded min-h-[44px] min-w-[200px] transition-all duration-150 hover:scale-[1.02] active:scale-[0.97] focus:outline-none focus:ring-2"
            style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
          >
            Create your store
          </button>
        </div>
      </section>
    </>
  )
}
