'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const accent = product.accent || '#7c1fa2';
  const price = Number(product.price).toLocaleString('en-IN');

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column',
        background: '#fff',
        border: `1px solid ${hovered ? `${accent}30` : 'rgba(124,31,162,0.08)'}`,
        transition: 'all 0.4s ease',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? `0 24px 60px ${accent}22` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            width={400} height={533}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
            unoptimized
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f0ff' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#d8b4fe' }}>photo_camera</span>
          </div>
        )}
        {/* Category badge */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          background: accent, color: '#fff',
          fontFamily: 'Outfit, sans-serif', fontSize: 9,
          fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
          padding: '5px 10px',
        }}>
          {product.category}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#1a0030', marginBottom: 6 }}>
          {product.name}
        </h3>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 700, color: accent, marginBottom: 12 }}>
          ₹{price}
        </div>
        {product.description && (
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: '#6b5c7e', lineHeight: 1.75, marginBottom: 20, flex: 1 }}>
            {product.description}
          </p>
        )}
        <Link
          href={`https://wa.me/919830012345?text=Hi! I'm interested in the ${product.name} (₹${price}). ${product.image_url ? `Photo: ${product.image_url}` : ''}`}
          style={{
            marginTop: 'auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: `linear-gradient(135deg, ${accent}, #be185d)`,
            color: '#fff',
            fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            padding: '14px 20px', textDecoration: 'none',
            transition: 'opacity 0.3s',
            opacity: hovered ? 0.92 : 1,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>chat</span>
          Enquire on WhatsApp
        </Link>
      </div>
    </div>
  );
}
