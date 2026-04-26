import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: "Contact | Romi's Saree",
  description: "Visit Romi's atelier in Kolkata or reach us on WhatsApp for personal styling assistance.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100 }}>
        {/* ── HEADER ── */}
        <section style={{ textAlign: 'center', padding: '60px 20px 40px', background: '#faf7ff' }}>
          <div className="section-container">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Get In Touch</div>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 400, color: '#1a0030', marginBottom: 20 }}>
                We&apos;re Here For<br />
                <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #7c1fa2 0%, #be185d 50%, #c2410c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>You</em>
              </h1>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, color: '#6b5c7e', maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
                Experience the touch of authentic silk and the magic of hand-weaving in person. Our curators are ready to assist you.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ── CONTACT SPLIT ── */}
        <section style={{ padding: '80px 0 140px', background: '#faf7ff' }}>
          <style>{`
            .responsive-contact { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
            @media (max-width: 1024px) {
              .responsive-contact { gap: 40px; }
            }
            @media (max-width: 768px) {
              .responsive-contact { grid-template-columns: 1fr; }
            }
            .icon-bounce:hover { transform: scale(1.1) rotate(5deg); }
            .whatsapp-btn:hover { transform: translateY(-4px); }
            .image-zoom-hover { transition: transform 0.8s ease; }
            .image-zoom-hover:hover { transform: scale(1.05); }
            .hover-map-btn { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
            .hover-map-btn:hover { transform: scale(1.15); }
          `}</style>
          <div className="section-container">
            <div className="responsive-contact">
              {/* Left: Info */}
              <ScrollReveal direction="right" delay={0.4}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 48 }}>
                  {[
                    { icon: 'location_on', title: 'Our Address', text: '12 Heritage Lane, Artistry District\nKolkata, West Bengal 700019' },
                    { icon: 'call', title: 'Call Us', text: '+91 98300 12345' },
                    { icon: 'schedule', title: 'Working Hours', text: 'Monday – Saturday: 10am – 7pm\nSunday: 11am – 5pm' },
                  ].map(({ icon, title, text }) => (
                    <div key={icon} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                      <div className="icon-bounce" style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(124,31,162,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.3s ease' }}>
                        <span className="material-symbols-outlined" style={{ color: '#7c1fa2', fontSize: 24 }}>{icon}</span>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b5c7e', marginBottom: 8 }}>{title}</div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, color: '#1a0030', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{text}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="https://wa.me/916290725060"
                  className="whatsapp-btn"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 16,
                    background: 'linear-gradient(135deg, #7c1fa2 0%, #be185d 100%)',
                    padding: '20px 32px', borderRadius: 4, textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 12px 30px rgba(124,31,162,0.2)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 32, fontVariationSettings: "'FILL' 1" }}>chat</span>
                  <div>
                    <span style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Direct Assistance</span>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#fff', lineHeight: 1 }}>WhatsApp Our Curators</span>
                  </div>
                </Link>
              </ScrollReveal>

              {/* Right: Map/Image */}
              <ScrollReveal direction="left" delay={0.6}>
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: 12, position: 'relative', boxShadow: '0 24px 48px rgba(26,0,48,0.08)' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Kolkata+(Romi's%20Saree)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  />
                  {/* Map Interactive Overlay */}
                  <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'none' }}>
                    <div style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', pointerEvents: 'auto' }}>
                      <div style={{ color: '#1a0030', fontFamily: 'Outfit, sans-serif', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 2, fontSize: 16 }}>Romi&apos;s Saree</div>
                      <div style={{ color: '#6b5c7e', fontSize: 12, fontFamily: 'Outfit, sans-serif' }}>Open in Maps app</div>
                    </div>
                    <Link href="https://maps.app.goo.gl/vZCiAF1UC6T8rPH18" target="_blank" rel="noopener noreferrer" className="hover-map-btn" style={{ background: '#be185d', width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', boxShadow: '0 12px 24px rgba(190,24,93,0.3)', pointerEvents: 'auto', transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}>directions</span>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
