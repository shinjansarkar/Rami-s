'use client';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

const CATEGORIES = ['All', 'Tant', 'Silk', 'Cotton', 'Jamdani', 'Baluchari', 'Designer', 'Party Wear', 'Daily Wear'];

export default function CollectionGrid({ initialProducts }) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProducts = activeTab === 'All' 
    ? initialProducts 
    : initialProducts.filter(p => p.category === activeTab);

  return (
    <section style={{ padding: '40px 0 120px', background: '#faf7ff' }}>
      <div className="section-container">
        
        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              style={{
                background: activeTab === category ? '#1a0030' : '#fff',
                color: activeTab === category ? '#fff' : '#6b5c7e',
                border: `1px solid ${activeTab === category ? '#1a0030' : 'rgba(124,31,162,0.15)'}`,
                padding: '10px 24px', borderRadius: 30,
                fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
                cursor: 'pointer', transition: 'all 0.3s ease',
                boxShadow: activeTab === category ? '0 8px 20px rgba(26,0,48,0.15)' : 'none'
              }}
              onMouseEnter={e => {
                if (activeTab !== category) {
                  e.currentTarget.style.color = '#1a0030';
                  e.currentTarget.style.borderColor = '#7c1fa2';
                }
              }}
              onMouseLeave={e => {
                if (activeTab !== category) {
                  e.currentTarget.style.color = '#6b5c7e';
                  e.currentTarget.style.borderColor = 'rgba(124,31,162,0.15)';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 64, color: '#e9d5ff', marginBottom: 16 }}>inventory_2</span>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: '#1a0030' }}>No pieces found</h3>
            <p style={{ fontFamily: 'Outfit, sans-serif', color: '#6b5c7e', marginTop: 8 }}>We are currently crafting new master pieces for this collection.</p>
            <button onClick={() => setActiveTab('All')} style={{
              marginTop: 24, background: 'transparent', color: '#7c1fa2', border: '1px solid #7c1fa2', padding: '10px 24px',
              borderRadius: 4, fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.1em', cursor: 'pointer'
            }}>
              View All Sarees
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
