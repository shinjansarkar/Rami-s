import Link from 'next/link';
import FooterIcons from '@/components/FooterIcons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1a0030 0%, #3b0764 50%, #1e0038 100%)',
      color: '#fff',
      padding: '80px 0 40px',
    }}>
      <div className="section-container">
        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 56,
          paddingBottom: 56,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 32,
              fontStyle: 'italic', fontWeight: 600,
              background: 'linear-gradient(135deg, #d8b4fe, #f9a8d4, #fb923c)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: 16,
            }}>
              Romi&apos;s
            </div>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, lineHeight: 1.75, color: 'rgba(255,255,255,0.5)' }}>
              Bringing the soul of Bengal to your wardrobe. Authentic, artisanal, and timeless sarees crafted with generations of love.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f9a8d4', marginBottom: 20 }}>Explore</div>
            {[
              { href: '/', label: 'Home' },
              { href: '/collection', label: 'Collection' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: 12, transition: 'color 0.25s' }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Info */}
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f9a8d4', marginBottom: 20 }}>Information</div>
            {['Shipping & Returns', 'Privacy Policy', 'Wholesale Inquiry', 'Care Instructions'].map(label => (
              <Link key={label} href="#" style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: 12, transition: 'color 0.25s' }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Connect */}
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f9a8d4', marginBottom: 20 }}>Connect</div>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 12 }}>
              7/A Subinoy, Pratap Ghosh Sarani, GIP Colony<br />
              Ganendra Kanan, Jagacha, Howrah, West Bengal 711112
            </p>
            <Link href="https://share.google/UaaSV3oOiRQ43lAQf" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f9a8d4', textDecoration: 'none', marginBottom: 24, paddingBottom: 4, borderBottom: '1px solid rgba(249,168,212,0.3)', transition: 'border-color 0.3s' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>location_on</span>
              View on Map
            </Link>
            <br/>
            <Link href="https://wa.me/916290725060" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4ade80', textDecoration: 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>chat</span>
              WhatsApp Us
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            © {year} Romi&apos;s Saree Collection. Bengali Artistry, Woven for the World.
          </p>
          <FooterIcons />
        </div>
      </div>
    </footer>
  );
}
