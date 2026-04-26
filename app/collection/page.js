import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import CollectionGrid from '@/components/CollectionGrid';
import ScrollReveal from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Collection | Romi's Saree",
  description: "Browse Romi's hand-woven heritage sarees. Discover the meticulous craftsmanship of Bengal's finest weavers.",
};

async function getProducts() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')) {
      return [];
    }
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase
      .from('sarees')
      .select('*')
      .order('created_at', { ascending: false });
    if (error || !data?.length) return [];
    return data.map((p) => ({ ...p, accent: p.accent || '#7c1fa2' }));
  } catch {
    return [];
  }
}

export default async function CollectionPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main>

        {/* ── PAGE HERO ── */}
        <section style={{
          background: 'linear-gradient(135deg, #1a0030 0%, #3b0764 60%, #5b1578 100%)',
          padding: '160px 0 100px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {[400, 650, 900].map((s, idx) => (
            <div key={s} style={{
              position: 'absolute', top: '50%', left: '50%',
              width: s, height: s, borderRadius: '50%',
              border: '1px solid rgba(216,180,254,0.05)',
              transform: 'translate(-50%,-50%)', pointerEvents: 'none',
              animation: `spin ${30 + idx * 10}s linear infinite ${idx % 2 === 0 ? 'reverse' : ''}`
            }} />
          ))}
          <ScrollReveal direction="up" delay={0.2} className="section-container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="eyebrow" style={{ color: '#f9a8d4', marginBottom: 20 }}>The Artisanal Edit</div>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 300, color: '#fff',
              lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: 24,
            }}>
              Romi&apos;s Saree<br />
              <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #d8b4fe 0%, #f9a8d4 50%, #fb923c 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Collection</em>
            </h1>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '0 auto', lineHeight: 1.85 }}>
              Hand-woven heritage, draped in modern elegance. Discover the meticulous craftsmanship of Bengal&apos;s finest weavers.
            </p>
          </ScrollReveal>
        </section>

        <ScrollReveal direction="up" delay={0.4}>
          <CollectionGrid initialProducts={products} />
        </ScrollReveal>

        {/* ── BEHIND THE WEAVES ── */}
        <section style={{ padding: '120px 0', background: '#faf7ff', position: 'relative', overflow: 'hidden' }}>
          <div className="section-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'center' }} className="responsive-story">
              <style>{`
                @media (max-width: 1024px) {
                  .responsive-story { grid-template-columns: 1fr !important; gap: 40px !important; }
                  .story-img-container { height: 400px !important; }
                }
              `}</style>
              
              <ScrollReveal direction="right" style={{ position: 'relative', height: 600, borderRadius: 8, overflow: 'hidden', boxShadow: '0 24px 48px rgba(26,0,48,0.1)' }} className="story-img-container">
                <Image 
                  src="/handloom.png" 
                  alt="Traditional handloom weaving" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  unoptimized 
                />
                <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.2)', margin: 16, borderRadius: 4, pointerEvents: 'none' }} />
              </ScrollReveal>
              
              <ScrollReveal direction="left">
                <div className="eyebrow" style={{ marginBottom: 20 }}>Our Legacy</div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 300, color: '#1a0030', lineHeight: 1.1, marginBottom: 32 }}>
                  The Hands That<br />
                  <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #7c1fa2 0%, #be185d 50%, #c2410c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Shape Tradition</em>
                </h2>
                <div className="divider" style={{ marginBottom: 32 }} />
                
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, color: '#6b5c7e', lineHeight: 1.8, marginBottom: 24 }}>
                  Every Romi&apos;s saree is a testament to the enduring spirit of Bengal&apos;s master weavers. What begins as fine threads is transformed over weeks, sometimes months, of painstaking labor on wooden handlooms.
                </p>
                
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, color: '#6b5c7e', lineHeight: 1.8, marginBottom: 40 }}>
                  We work directly with artisanal families in rural Bengal, ensuring fair wages and the continuation of weaving techniques that have been passed down for centuries. When you wear a Romi&apos;s drape, you are wrapped in living history.
                </p>
                
                <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, color: '#1a0030', fontWeight: 400, lineHeight: 1, marginBottom: 8 }}>12+</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#be185d' }}>Years of Heritage</div>
                  </div>
                  <div style={{ width: 1, height: 48, background: 'rgba(26,0,48,0.1)' }} />
                  <div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, color: '#1a0030', fontWeight: 400, lineHeight: 1, marginBottom: 8 }}>100%</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#be185d' }}>Hand-Woven Art</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      
      <Link href="https://wa.me/919830012345" className="whatsapp-float-btn">
        <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 26, fontVariationSettings: "'FILL' 1" }}>chat</span>
      </Link>
    </>
  );
}
