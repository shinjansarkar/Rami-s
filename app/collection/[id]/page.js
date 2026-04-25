'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { featuredProduct } from '@/lib/data';

export default function ProductDetailPage({ params }) {
  const product = featuredProduct;
  const [activeImage, setActiveImage] = useState(0);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* ── Left: Image Gallery ── */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Image */}
            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                width={900}
                height={1100}
                className="w-full h-[700px] object-cover silk-shadow transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute bottom-6 left-6 bg-surface/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-xs font-medium tracking-widest text-primary uppercase">Masterpiece Collection</span>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 gap-8">
              <div className="mt-12">
                <Image
                  src={product.images[1].src}
                  alt={product.images[1].alt}
                  width={500}
                  height={650}
                  className="w-full h-[450px] object-cover rounded-lg silk-shadow"
                  unoptimized
                />
              </div>
              <div>
                <Image
                  src={product.images[0].src}
                  alt="Saree Detail"
                  width={500}
                  height={650}
                  className="w-full h-[450px] object-cover rounded-lg silk-shadow"
                  unoptimized
                />
              </div>
            </div>

            {/* Decorative Element */}
            <div className="pt-8 opacity-20 flex justify-center">
              <span className="material-symbols-outlined text-6xl text-primary">settings_suggest</span>
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">

            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-xs font-medium text-outline mb-4">
              <Link href="/collection" className="hover:text-primary cursor-pointer transition-colors">Collections</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <span className="hover:text-primary cursor-pointer transition-colors">{product.category}</span>
            </nav>

            <header className="mb-10">
              <h1 className="font-headline text-5xl text-primary leading-tight mb-4">{product.name}</h1>
              <p className="font-headline text-2xl text-secondary">{product.price}</p>
            </header>

            <div className="space-y-8">
              {/* Description */}
              <p className="text-on-surface-variant leading-relaxed font-body text-lg">
                {product.description}
              </p>

              {/* Specs */}
              <div className="bg-surface-container-low p-8 rounded-lg space-y-6">
                <h3 className="font-headline text-lg text-primary border-b border-outline-variant/30 pb-2">Fabric Specifications</h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-outline block mb-1">{key}</span>
                      <span className="text-on-surface font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6 space-y-4">
                <Link
                  href="https://wa.me/#"
                  className="w-full bg-secondary text-on-secondary py-5 px-8 flex items-center justify-center space-x-3 rounded-lg hover:bg-secondary-fixed-dim transition-colors duration-300 silk-shadow group"
                >
                  <span className="material-symbols-outlined">chat</span>
                  <span className="font-semibold tracking-wide">Enquire on WhatsApp</span>
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                </Link>

                <div className="flex items-center justify-between px-2 pt-4">
                  <button className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors text-sm font-medium">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                    <span>Save to Wishlist</span>
                  </button>
                  <button className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors text-sm font-medium">
                    <span className="material-symbols-outlined text-xl">share</span>
                    <span>Share Heritage</span>
                  </button>
                </div>
              </div>

              {/* Craftsmanship Note */}
              <div className="border-l-2 border-secondary pl-6 py-2 mt-12">
                <p className="text-xs italic text-secondary-fixed-dim tracking-wide font-body">
                  &quot;A single Jamdani takes approximately 200 hours of manual labor by two master weavers. Your purchase preserves a 400-year-old tradition.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── You May Also Like ── */}
        <section className="mt-32">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-2 block">Curated Selection</span>
              <h2 className="font-headline text-4xl text-primary">You may also like</h2>
            </div>
            <Link
              href="/collection"
              className="text-primary hover:text-secondary font-semibold flex items-center space-x-2 group"
            >
              <span>View Collection</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">trending_flat</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {product.relatedProducts.map((rel, i) => (
              <div
                key={rel.id}
                className={`group cursor-pointer ${rel.offset ? 'md:mt-12' : ''}`}
              >
                <div className="overflow-hidden rounded-lg mb-6 relative silk-shadow">
                  <Image
                    src={rel.image}
                    alt={rel.alt}
                    width={500}
                    height={700}
                    className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-outline font-medium tracking-widest uppercase">{rel.category}</p>
                  <h3 className="font-headline text-xl text-primary">{rel.name}</h3>
                  <p className="font-headline text-secondary mt-2">{rel.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
