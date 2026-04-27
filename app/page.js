import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import HoverCard from '@/components/HoverCard';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: "Romi's Home - সাজিয়েছি এক নতুন পসরা | Authentic Bengali Sarees",
  description: "Discover timeless Bengali sarees curated with love at Romi's. A celebration of heritage weaving and contemporary grace. সাজিয়েছি এক নতুন পসরা - We have adorned a new offering.",
};

const stats = [
  { num: '500+', label: 'Sarees Curated' },
  { num: '12+', label: 'Years of Heritage' },
  { num: '1000+', label: 'Happy Customers' },
  { num: '20+', label: 'Weaving Traditions' },
];

const features = [
  {
    icon: 'verified',
    title: 'Authentic Collection',
    desc: 'Directly sourced from master weavers of Bengal, ensuring every thread tells a genuine story of heritage.',
    color: '#7c1fa2',
    bg: 'rgba(124,31,162,0.06)',
  },
  {
    icon: 'payments',
    title: 'Accessible Luxury',
    desc: 'We bridge the gap between artisan mastery and your cherished wardrobe at honest prices.',
    color: '#be185d',
    bg: 'rgba(190,24,93,0.06)',
  },
  {
    icon: 'auto_awesome',
    title: 'Handpicked Quality',
    desc: 'Romi personally inspects every weave for zari perfection and fabric integrity before it reaches you.',
    color: '#c2410c',
    bg: 'rgba(194,65,12,0.06)',
  },
  {
    icon: 'support_agent',
    title: 'Personal Assistance',
    desc: 'Need help styling or choosing the right drape? Our dedicated team is just a WhatsApp message away.',
    color: '#059669',
    bg: 'rgba(5,150,105,0.06)',
  },
];

export default function HomePage() {
  const romisMapUrl = "https://www.google.com/maps/place/Romi's/@22.5899285,88.283624,805m/data=!3m1!1e3!4m6!3m5!1s0x3a0279a59004036b:0x290a789b12005b33!8m2!3d22.5899285!4d88.2883876!16s%2Fg%2F11trkmpnjv?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D";
  const romisMapEmbedUrl = 'https://maps.google.com/maps?cid=2957308712739429171&hl=en&output=embed';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Romi's Saree",
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuA2BWsi_c7CqNkS6Epd98Yg1I44oraVV_vY3mifJYQ_f836M0xEKcmqPznKdwD40YR0YAA8YNjzsTBBTTWXnJ97_mZ2Ucpnc57-zvr6SPE9NeDa1EFJawid-ZFgQr4dwXgf6PaRq1b8h5i1s5Y4eT8kUXTHCUuAoPSPQiZRdN71feYaawYdSufuWxAzHib9JWapUhVz_f99U-iFdxgjhogb5Im8jNBltqydJf5nPEji5fmNR0_PleC-bVAPG4YfQ0Qvbdja9FoFKg",
    "description": "Authentic Bengali sarees curated with love. সাজিয়েছি এক নতুন পসরা",
    "url": "https://romissaree.com",
    "telephone": "+916290725060",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7/A Subinoy, Pratap Ghosh Sarani, GIP Colony, Ganendra Kanan, Jagacha",
      "addressLocality": "Howrah",
      "addressRegion": "West Bengal",
      "postalCode": "711112",
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          background: '#000000',
        }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="hero.avif"
              alt="Elegant woman wearing a beautiful red saree"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.04)' }}
              priority
              unoptimized
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)',
            }} />
          </div>

          <div className="section-container" style={{ position: 'relative', zIndex: 2, paddingBottom: 140, paddingTop: 160, width: '100%' }}>
            <ScrollReveal direction="up" delay={0.2} style={{ maxWidth: 700 }}>
              <div className="eyebrow" style={{ color: '#f9a8d4', marginBottom: 24 }}>
                Romi&apos;s Signature Collection
              </div>
              <h1 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(56px, 8vw, 110px)',
                fontWeight: 300,
                color: '#fff',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                marginBottom: 28,
              }}>
                Elegance in<br />
                <em style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, #d8b4fe 0%, #f9a8d4 50%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Every Thread</em>
              </h1>
              <p style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 16,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.8,
                maxWidth: 480,
                marginBottom: 44,
              }}>
                Discover timeless Bengali sarees curated with love at Romi&apos;s. A celebration of heritage weaving and contemporary grace.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link href="/collection" className="btn-primary">
                  View Collection
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </Link>
                <Link href="https://wa.me/916290725060" className="btn-outline-light">
                  <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>chat</span>
                  WhatsApp Romi
                </Link>
              </div>
            </ScrollReveal>
          </div>
          {/* decorative rings */}
          <div style={{ position: 'absolute', right: -80, bottom: -80, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(216,180,254,0.15)', pointerEvents: 'none', animation: 'spin 40s linear infinite' }} />
          <div style={{ position: 'absolute', right: 40, bottom: 40, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(216,180,254,0.1)', pointerEvents: 'none', animation: 'spin 20s linear infinite reverse' }} />
        </section>

        <style>{`
          .responsive-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center; }
          .responsive-split { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
          @media (max-width: 1024px) {
            .responsive-split { gap: 40px; }
          }
          @media (max-width: 768px) {
            .responsive-stats { grid-template-columns: repeat(2, 1fr); gap: 32px 16px; }
            .responsive-split { grid-template-columns: 1fr; }
          }
          @media (max-width: 480px) {
            .responsive-stats { grid-template-columns: 1fr; }
          }
          .btn-outline-light {
            display: inline-flex; align-items: center; gap: 8px;
            background: transparent; color: #fff;
            font-family: 'Outfit', sans-serif; font-size: 11px;
            font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
            padding: 15px 31px; border: 1.5px solid rgba(255,255,255,0.35);
            text-decoration: none; transition: all 0.3s ease;
          }
          .btn-outline-light:hover {
            background: #fff; color: #1a0030; border-color: #fff; transform: translateY(-2px);
          }
          .hover-map-btn {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .hover-map-btn:hover {
            transform: scale(1.15);
          }
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>

        {/* ── STATS BAR ── */}
        <section style={{ background: 'linear-gradient(135deg, #7c1fa2 0%, #be185d 50%, #c2410c 100%)', padding: '60px 0' }}>
          <div className="section-container">
            <div className="responsive-stats">
              {stats.map(({ num, label }, idx) => (
                <ScrollReveal key={label} direction="up" delay={idx * 0.1} style={{ padding: '8px 0' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 600, color: '#fff', lineHeight: 1, marginBottom: 8 }}>{num}</div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>{label}</div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED SPLIT ── */}
        <section style={{ padding: '120px 0', background: '#faf7ff' }}>
          <div className="section-container">
            <div className="responsive-split">
              <ScrollReveal direction="right" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="hover-zoom" style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative', borderRadius: 2 }}>
                  <Image src="saree2white.png" alt="Handwoven Jamdani saree" fill style={{ objectFit: 'cover', transition: 'transform 0.8s ease' }} unoptimized />
                </div>
                <div className="hover-zoom" style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative', borderRadius: 2, marginTop: 48 }}>
                  <Image src="saree1.png" alt="Vibrant silk saree" fill style={{ objectFit: 'cover', transition: 'transform 0.8s ease' }} unoptimized />
                </div>
              </ScrollReveal>
              <ScrollReveal direction="left">
                <div className="eyebrow" style={{ marginBottom: 20 }}>The Artisanal Edit</div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 4vw, 58px)', fontWeight: 400, color: '#1a0030', lineHeight: 1.1, marginBottom: 24 }}>
                  The Art of<br />
                  <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #7c1fa2 0%, #be185d 50%, #c2410c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Jamdani &amp; Baluchari</em>
                </h2>
                <div className="divider" style={{ marginBottom: 24 }} />
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, color: '#6b5c7e', lineHeight: 1.85, marginBottom: 40 }}>
                  Explore our curated selection of fine muslin jamdanis and intricate baluchari silks, each a masterpiece of ancient Bengali craftsmanship. Every saree carries the breath of generations.
                </p>
                <Link href="/collection" className="link-arrow">
                  Browse Full Collection
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section style={{ padding: '100px 0', background: 'linear-gradient(180deg, #f5f0ff 0%, #faf7ff 100%)' }}>
          <div className="section-container">
            <ScrollReveal direction="up" style={{ textAlign: 'center', marginBottom: 64 }}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Why Romi&apos;s</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 400, color: '#1a0030', marginBottom: 16 }}>
                Crafted with Purpose,<br />
                <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #7c1fa2 0%, #be185d 50%, #c2410c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Delivered with Love</em>
              </h2>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
              {features.map((feature, idx) => (
                <ScrollReveal key={feature.title} direction="up" delay={idx * 0.1}>
                  <HoverCard feature={feature} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── VISIT BOUTIQUE ── */}
        <section style={{ padding: '120px 0', background: '#fff', position: 'relative' }}>
          <div className="section-container">
            <div className="responsive-split">
              <ScrollReveal direction="right">
                <div className="eyebrow" style={{ marginBottom: 20 }}>Visit Our Boutique</div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 4vw, 58px)', fontWeight: 400, color: '#1a0030', lineHeight: 1.1, marginBottom: 24 }}>
                  Experience the Weave<br />
                  <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #7c1fa2 0%, #be185d 50%, #c2410c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>in Person</em>
                </h2>
                <div className="divider" style={{ marginBottom: 24 }} />
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, color: '#6b5c7e', lineHeight: 1.85, marginBottom: 40 }}>
                  Step into our haven of heritage. Feel the softness of authentic Jamdani and the rich texture of Baluchari silks. We invite you to explore our exclusive collections over a warm cup of Bengali tea.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48, paddingLeft: 24, borderLeft: '2px solid rgba(249,168,212,0.5)' }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(124,31,162,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c1fa2', flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>location_on</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: '#1a0030', marginBottom: 4, fontSize: 16 }}>Romi&apos;s Saree Boutique</div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, color: '#6b5c7e', lineHeight: 1.6 }}>7/A Subinoy, Pratap Ghosh Sarani, GIP Colony<br />Ganendra Kanan, Jagacha, Howrah, West Bengal 711112</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(124,31,162,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c1fa2', flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>schedule</span>
                    </div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, color: '#6b5c7e', fontWeight: 500 }}>Open Daily: 11:00 AM – 8:00 PM</div>
                  </div>
                </div>
                <Link href={romisMapUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>directions</span>
                  Get Directions
                </Link>
              </ScrollReveal>

              <ScrollReveal direction="left" style={{ position: 'relative', height: 500, borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 48px rgba(26,0,48,0.08)' }}>
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={romisMapEmbedUrl}
                />

                <Link
                  href={romisMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Romi's Saree in Google Maps"
                  style={{ position: 'absolute', inset: 0, zIndex: 1 }}
                />

                {/* Map Interactive Overlay */}
                <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'none', zIndex: 2 }}>
                  <div style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', pointerEvents: 'auto' }}>
                    <div style={{ color: '#1a0030', fontFamily: 'Outfit, sans-serif', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 2, fontSize: 16 }}>Romi&apos;s Saree</div>
                    <div style={{ color: '#6b5c7e', fontSize: 12, fontFamily: 'Outfit, sans-serif' }}>Open in Maps app</div>
                  </div>
                  <Link href={romisMapUrl} target="_blank" rel="noopener noreferrer" className="hover-map-btn" style={{ background: '#be185d', width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', boxShadow: '0 12px 24px rgba(190,24,93,0.3)', pointerEvents: 'auto' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}>directions</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <section style={{ background: 'linear-gradient(135deg, #1a0030 0%, #3b0764 100%)', padding: '100px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {[300, 500, 700].map((size, idx) => (
            <div key={size} style={{ position: 'absolute', top: '50%', left: '50%', width: size, height: size, borderRadius: '50%', border: '1px solid rgba(216,180,254,0.06)', transform: 'translate(-50%,-50%)', pointerEvents: 'none', animation: `spin ${20 + idx * 10}s linear infinite ${idx % 2 === 0 ? 'reverse' : ''}` }} />
          ))}
          <ScrollReveal direction="up" className="section-container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="eyebrow" style={{ color: '#f9a8d4', marginBottom: 20 }}>Start Your Journey</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
              Find Your Perfect<br />
              <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #d8b4fe, #f9a8d4, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Saree Today</em>
            </h2>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 440, margin: '0 auto 44px', lineHeight: 1.8 }}>
              Browse our curated collection or reach out directly — Romi is here to help you find the perfect drape for every occasion.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/collection" className="btn-primary">
                Explore Collection
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </Link>
              <Link href="https://wa.me/916290725060" className="btn-outline-light">
                <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>chat</span>
                Chat on WhatsApp
              </Link>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />

      <Link href="https://wa.me/916290725060" className="whatsapp-float-btn">
        <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 26, fontVariationSettings: "'FILL' 1" }}>chat</span>
      </Link>
    </>
  );
}
