import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import CollectionGrid from '@/components/CollectionGrid';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: "Collection | Romi's Saree",
  description: "Browse Romi's hand-woven heritage sarees. Discover the meticulous craftsmanship of Bengal's finest weavers.",
};

const sampleProducts = [
  {
    id: 1, name: 'Blue Silk Saree', category: 'Silk', price: 14500,
    description: 'Traditional motifs woven with midnight blue silk and shimmering gold zari thread.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV0k1_lB0bUaP4MBIGtrRODkbxTW3lchAmwEW-XQdOZ6WWMFBruGABkUC_MTVJ3CegOsRivskd1VLmLz60dK63EhFlfGxQz8dJOZbmtidkHfDUTPxRcUfPbDPNLQwDe5fkc9fwY1qXhIqPL8E18fMZNP8V70hS9_VRxPPbC1FtC86El8HuCb0coPuEfVubebXMHm5flpe8Kgx2k6nJfJIIDSbnShiGxof2tnB0M_fgMWNxyYa6ZQ1Ig4ABWmZfUVDW0ozFKNraHA',
    accent: '#1d4ed8',
  },
  {
    id: 2, name: 'Crimson Heritage', category: 'Baluchari', price: 18200,
    description: 'A classic Baluchari masterpiece depicting timeless folklore in every weave.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTjG5NLKJnwb9yKE6yPF3Cml7NdHxj0ocb8kCxMeBfudhFMWBFwg5GlZ6lScikumdO4fXmnlAk2Lqqn1Iqj9XkdkH2SdPN-N9etgVGwryKyHSqHUPJUWibh4hWJqilXacSqywNQZSQZVDnA6lrJP9qpXxc1vsZC-yeDrZzpA49q5ysWy3uzuTne7VQlHk4KQ8HJPw5RgTmHjn_QFLnJ2yWIlfZsU1B4laHl4ZELBM4Rmzg2z6lRjzIEdV2r8IDTR1GxwK9OxAjnA',
    accent: '#be185d',
  },
  {
    id: 3, name: 'Ivory Muslin', category: 'Cotton', price: 22000,
    description: "The legendary 'woven air' of Bengal, lightweight and exceptionally refined.",
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpS6bFSFs06C7TQvFSQeOGBl_JT95gzcVwwA8-AfdHLAXTJCtDrK-joGBQ3FkwRsEIgjJd6isN11UE7xyHEV41r5lfXleaY5t0pkthQx9iKTM-nFC-YXb8ThKQKVEFWt-tFiw72lzVCGD7fhiTAqTsvzGwO1eBSBwQGwQUxNyw538U4kX85D83nKpUbGqElpmOl05Hiybyh1NeVE8jomTW7IW58Gad03P4eHiwBko6gp3drmC-3h5g0HTkxJet459HOwXGIHnXOg',
    accent: '#059669',
  },
  {
    id: 4, name: 'Emerald Banarasi', category: 'Silk', price: 25800,
    description: 'Opulent silk with concentrated gold work on the pallu, perfect for festivities.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOJ2CE3HuBya08ecbAAUR5raQl3Hkb2ehhzOJ-1fOLAaLkoHgOjRf_54AmBAzNwyigFn17jxgy_x5XAiDfQrp-gyM13ZeROOCEhUCyInvbdRfZP2nBKz6snOf5wPWp8JCStexdbTe2fDMMDQp2nYZXNu8vUjquaM9MbGlpeBOJu_6SrtKVLgO1v7fvdEt98Gcn5IJr5O3jITD2CSgVywVzBFp7_CYxNxPn924u2hp8aEYMZmBFVmeL8c0b_VnLHHmSfbAIt69vYA',
    accent: '#7c1fa2',
  },
];

async function getProducts() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')) {
      return sampleProducts;
    }
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase
      .from('sarees')
      .select('*')
      .order('created_at', { ascending: false });
    if (error || !data?.length) return sampleProducts;
    return data.map((p, i) => ({ ...p, accent: sampleProducts[i % sampleProducts.length].accent }));
  } catch {
    return sampleProducts;
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
