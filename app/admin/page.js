'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = ['Silk', 'Cotton', 'Tant', 'Jamdani', 'Baluchari', 'Designer', 'Party Wear', 'Daily Wear'];

const navItems = [
  { icon: 'inventory_2', label: 'Inventory', active: true },
];

export default function AdminPage() {
  const [form, setForm] = useState({ name: '', price: '', category: 'Silk', description: '', stock_status: 'In Stock', stock_count: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loadingInventory, setLoadingInventory] = useState(true);
  const fileInputRef = useRef();

  // Stats
  const stats = [
    { label: 'Total Collection', value: inventory.length || '—', note: 'Sarees in database', icon: 'trending_up', iconColor: '#059669' },
    { label: 'Premium Grade', value: inventory.filter(s => ['Silk','Jamdani','Baluchari'].includes(s.category)).length || '—', note: 'Silk, Jamdani, Baluchari', icon: 'diamond', iconColor: '#7c1fa2' },
    { label: 'In Stock', value: inventory.filter(s => s.stock_status === 'In Stock').length || '—', note: 'Available for enquiry', icon: 'inventory_2', iconColor: '#c2410c' },
    { label: 'Categories', value: CATEGORIES.length, note: 'Heritage weave types', icon: 'category', iconColor: '#be185d' },
  ];

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchInventory = async () => {
    setLoadingInventory(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase.from('sarees').select('*').order('created_at', { ascending: false });
      if (!error && data) setInventory(data);
    } catch (e) {
      console.error('Supabase not configured:', e);
    }
    setLoadingInventory(false);
  };

  useEffect(() => { fetchInventory(); }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return showToast('Please fill in Name and Price', 'error');

    setSubmitting(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      let image_url = null;

      // 1. Upload image if provided
      if (imageFile) {
        const imageCompression = (await import('browser-image-compression')).default;
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(imageFile, options);
        
        const ext = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${form.name.replace(/\s+/g, '-').toLowerCase()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('sarees')
          .upload(fileName, compressedFile, { cacheControl: '3600', upsert: false });

        if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

        const { data: urlData } = supabase.storage.from('sarees').getPublicUrl(fileName);
        image_url = urlData.publicUrl;
      }

      // 2. Insert saree record
      const { error: insertError } = await supabase.from('sarees').insert([{
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        description: form.description,
        image_url,
        stock_status: form.stock_status,
        stock_count: form.stock_count ? parseInt(form.stock_count) : null,
      }]);

      if (insertError) throw new Error(insertError.message);

      showToast(`"${form.name}" added to inventory!`);
      setForm({ name: '', price: '', category: 'Silk', description: '', stock_status: 'In Stock', stock_count: '' });
      setImageFile(null);
      setImagePreview(null);
      fetchInventory();
    } catch (err) {
      showToast(err.message, 'error');
    }
    setSubmitting(false);
  };

  const getStoragePathFromPublicUrl = (publicUrl) => {
    if (!publicUrl) return null;
    const marker = '/storage/v1/object/public/sarees/';
    const index = publicUrl.indexOf(marker);
    if (index === -1) return null;
    const pathWithQuery = publicUrl.slice(index + marker.length);
    return decodeURIComponent(pathWithQuery.split('?')[0]);
  };

  const deleteItem = async (id, name, imageUrl) => {
    if (!confirm(`Remove "${name}" from inventory?`)) return;
    try {
      const { supabase } = await import('@/lib/supabase');

      const filePath = getStoragePathFromPublicUrl(imageUrl);
      if (filePath) {
        const { error: storageError } = await supabase.storage.from('sarees').remove([filePath]);
        if (storageError && !storageError.message?.toLowerCase().includes('not found')) {
          throw new Error(storageError.message);
        }
      }

      const { error: deleteError } = await supabase.from('sarees').delete().eq('id', id);
      if (deleteError) throw new Error(deleteError.message);

      showToast(`"${name}" removed`);
      fetchInventory();
    } catch (e) {
      showToast(e.message || 'Delete failed', 'error');
    }
  };

  return (
    <>
      <style>{`
        .admin-layout { display: flex; height: 100vh; overflow: hidden; background: #faf7ff; color: #1a0030; font-family: 'Outfit', sans-serif; flex-direction: row; }
        .admin-sidebar { width: 280px; background: linear-gradient(180deg, #1a0030 0%, #3b0764 100%); color: #fff; display: flex; flex-direction: column; flex-shrink: 0; padding: 32px 24px; border-right: 1px solid rgba(216,180,254,0.1); }
        .admin-main { flex: 1; overflow-y: auto; height: 100vh; background: #faf7ff; }
        .admin-header { position: sticky; top: 0; z-index: 10; background: rgba(250,247,255,0.9); backdrop-filter: blur(12px); padding: 32px 48px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(124,31,162,0.1); }
        .admin-content { padding: 40px 48px 80px; }
        .admin-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 48px; align-items: start; }
        .admin-brand { margin-bottom: 48px; padding: 0 12px; }
        .admin-nav { flex-grow: 1; display: flex; flex-direction: column; gap: 8px; }
        .admin-bottom-nav { margin-top: auto; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); }
        .admin-user-info { display: flex; align-items: center; padding: 0 12px; }
        .admin-links { margin-top: 20px; padding: 0 12px; display: flex; justify-content: space-between; }
        
        @media (max-width: 1024px) {
          .admin-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .admin-layout { flex-direction: column; height: auto; min-height: 100vh; overflow-y: visible; }
          .admin-sidebar { width: 100%; height: auto; flex-direction: column; padding: 24px 16px; border-right: none; border-bottom: 1px solid rgba(216,180,254,0.1); }
          .admin-brand { margin-bottom: 24px; text-align: center; }
          .admin-nav { margin-bottom: 24px; }
          .admin-main { height: auto; overflow-y: visible; }
          .admin-header { padding: 20px 16px; flex-direction: column; align-items: flex-start; gap: 12px; position: static; }
          .admin-content { padding: 24px 16px 60px; }
          .admin-grid { gap: 32px; }
        }
      `}</style>
      <div className="admin-layout">

        {/* ─── SIDEBAR ─── */}
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontStyle: 'italic', fontWeight: 600, background: 'linear-gradient(135deg, #d8b4fe, #f9a8d4, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Romi&apos;s
            </h1>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#f9a8d4', marginTop: 4, fontWeight: 700 }}>Atelier Portal</p>
          </div>

          <nav className="admin-nav">
            {navItems.map(({ icon, label, active }) => (
              <button key={label} style={{
                display: 'flex', alignItems: 'center', width: '100%', padding: '12px 16px', borderRadius: 8,
                fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', transition: 'all 0.3s ease',
                background: active ? 'rgba(216,180,254,0.15)' : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                border: 'none', cursor: 'pointer', textAlign: 'left'
              }}
              onMouseEnter={e => { if(!active) e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = active ? 'rgba(216,180,254,0.15)' : 'rgba(216,180,254,0.05)'; }}
              onMouseLeave={e => { if(!active) e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = active ? 'rgba(216,180,254,0.15)' : 'transparent'; }}
              >
                <span className="material-symbols-outlined" style={{ marginRight: 16, fontSize: 20 }}>{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          <div className="admin-bottom-nav">
            <div className="admin-user-info">
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #7c1fa2, #be185d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>person</span>
              </div>
              <div style={{ marginLeft: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 700 }}>Admin User</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Master Weaver</p>
              </div>
            </div>
            <div className="admin-links">
              <Link href="/" style={{ fontSize: 11, color: '#f9a8d4', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#f9a8d4'}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_back</span> Back to Boutique
              </Link>
              <button 
                onClick={async () => {
                  const { supabase } = await import('@/lib/supabase');
                  await supabase.auth.signOut();
                  window.location.href = '/';
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: '#f9a8d4', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#f9a8d4'}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>logout</span> Logout
              </button>
            </div>
          </div>
        </aside>

        {/* ─── MAIN CONTENT ─── */}
        <main className="admin-main">
          
          {/* Header */}
          <header className="admin-header">
            <div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 600, color: '#1a0030', marginBottom: 4 }}>
                Atelier Inventory
              </h2>
              <p style={{ fontSize: 14, color: '#6b5c7e' }}>Manage Romi&apos;s exclusive heritage collection and weave records.</p>
            </div>
          </header>

          <div className="admin-content">

            {/* Stats */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 48 }}>
              {stats.map(({ label, value, note, icon, iconColor }) => (
                <div key={label} style={{ background: '#fff', padding: 24, borderRadius: 8, border: '1px solid rgba(124,31,162,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6b5c7e' }}>{label}</p>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${iconColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: iconColor }}>{icon}</span>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 42, fontWeight: 600, color: '#1a0030', lineHeight: 1 }}>{value}</h3>
                  <p style={{ fontSize: 12, color: '#6b5c7e', marginTop: 12 }}>{note}</p>
                </div>
              ))}
            </section>

            {/* Form + Grid */}
            <div className="admin-grid">

              {/* ─── ADD FORM ─── */}
              <div style={{ background: '#fff', padding: 32, borderRadius: 8, border: '1px solid rgba(124,31,162,0.08)', boxShadow: '0 4px 30px rgba(0,0,0,0.03)', position: 'sticky', top: 140 }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#1a0030', marginBottom: 24 }}>Add Heritage Piece</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c1fa2', marginBottom: 8 }}>Piece Name *</label>
                    <input ref={fileInputRef} type="text" placeholder="e.g. Midnight Azure Jamdani"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #e9d5ff', padding: '8px 0', fontSize: 14, color: '#1a0030', outline: 'none', transition: 'border-color 0.3s' }}
                      onFocus={e => e.currentTarget.style.borderBottomColor = '#7c1fa2'} onBlur={e => e.currentTarget.style.borderBottomColor = '#e9d5ff'}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 20 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c1fa2', marginBottom: 8 }}>Price (₹) *</label>
                      <input type="number" placeholder="0"
                        value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #e9d5ff', padding: '8px 0', fontSize: 14, color: '#1a0030', outline: 'none', transition: 'border-color 0.3s' }}
                        onFocus={e => e.currentTarget.style.borderBottomColor = '#7c1fa2'} onBlur={e => e.currentTarget.style.borderBottomColor = '#e9d5ff'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c1fa2', marginBottom: 8 }}>Category</label>
                      <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #e9d5ff', padding: '8px 0', fontSize: 14, color: '#1a0030', outline: 'none', cursor: 'pointer' }}>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 20 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c1fa2', marginBottom: 8 }}>Stock Status</label>
                      <select value={form.stock_status} onChange={e => setForm({ ...form, stock_status: e.target.value })}
                        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #e9d5ff', padding: '8px 0', fontSize: 14, color: '#1a0030', outline: 'none', cursor: 'pointer' }}>
                        <option>In Stock</option>
                        <option>Limited</option>
                        <option>Sold Out</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c1fa2', marginBottom: 8 }}>Count</label>
                      <input type="number" placeholder="e.g. 12"
                        value={form.stock_count} onChange={e => setForm({ ...form, stock_count: e.target.value })}
                        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #e9d5ff', padding: '8px 0', fontSize: 14, color: '#1a0030', outline: 'none', transition: 'border-color 0.3s' }}
                        onFocus={e => e.currentTarget.style.borderBottomColor = '#7c1fa2'} onBlur={e => e.currentTarget.style.borderBottomColor = '#e9d5ff'}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c1fa2', marginBottom: 8 }}>Description</label>
                    <textarea placeholder="Describe the weave, thread count..."
                      rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #e9d5ff', padding: '8px 0', fontSize: 14, color: '#1a0030', outline: 'none', resize: 'none', transition: 'border-color 0.3s' }}
                      onFocus={e => e.currentTarget.style.borderBottomColor = '#7c1fa2'} onBlur={e => e.currentTarget.style.borderBottomColor = '#e9d5ff'}
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c1fa2', marginBottom: 8 }}>Saree Photo</label>
                    <div
                      style={{
                        border: `1.5px dashed ${imagePreview ? '#7c1fa2' : '#e9d5ff'}`,
                        background: imagePreview ? 'rgba(124,31,162,0.03)' : '#faf7ff',
                        borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.3s', textAlign: 'center'
                      }}
                      onClick={() => document.getElementById('saree-image-input').click()}
                      onDrop={handleDrop} onDragOver={e => e.preventDefault()}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#7c1fa2'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = imagePreview ? '#7c1fa2' : '#e9d5ff'}
                    >
                      {imagePreview ? (
                        <div style={{ position: 'relative', width: '100%', height: 160 }}>
                          <Image src={imagePreview} alt="Preview" fill style={{ objectFit: 'cover', borderRadius: 4 }} unoptimized />
                          <button type="button" onClick={e => { e.stopPropagation(); setImageFile(null); setImagePreview(null); }}
                            style={{ position: 'absolute', top: 8, right: 8, background: '#be185d', color: '#fff', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 12 }}>✕</button>
                        </div>
                      ) : (
                        <>
                          <span className="material-symbols-outlined" style={{ color: '#d8b4fe', fontSize: 32, marginBottom: 8 }}>upload_file</span>
                          <p style={{ fontSize: 11, fontWeight: 600, color: '#6b5c7e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Click or drag & drop photo</p>
                          <p style={{ fontSize: 10, color: '#a855f7', marginTop: 4 }}>JPG, PNG up to 5MB</p>
                        </>
                      )}
                    </div>
                    <input id="saree-image-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                  </div>

                  <button type="submit" disabled={submitting}
                    style={{
                      background: 'linear-gradient(135deg, #7c1fa2 0%, #be185d 100%)',
                      color: '#fff', padding: '16px', borderRadius: 6,
                      fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                      border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'transform 0.3s, box-shadow 0.3s',
                      marginTop: 8
                    }}
                    onMouseEnter={e => { if(!submitting) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(124,31,162,0.3)'; } }}
                    onMouseLeave={e => { if(!submitting) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; } }}
                  >
                    {submitting ? (
                      <><span className="material-symbols-outlined" style={{ fontSize: 16, animation: 'spin 1s linear infinite' }}>refresh</span> Saving...</>
                    ) : (
                      <>Register Piece <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check_circle</span></>
                    )}
                  </button>
                </form>
              </div>

              {/* ─── INVENTORY GRID ─── */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, borderBottom: '1px solid rgba(124,31,162,0.1)', paddingBottom: 16 }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#1a0030' }}>Store Collection</h3>
                  <span style={{ fontSize: 12, color: '#6b5c7e', fontWeight: 600 }}>{inventory.length} pieces</span>
                </div>

                {loadingInventory ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{ animation: 'pulse 1.5s infinite opacity' }}>
                        <div style={{ aspectRatio: '3/4', background: '#f5f0ff', borderRadius: 6, marginBottom: 12 }} />
                        <div style={{ height: 16, background: '#f5f0ff', borderRadius: 4, marginBottom: 8, width: '60%' }} />
                        <div style={{ height: 12, background: '#f5f0ff', borderRadius: 4, width: '40%' }} />
                      </div>
                    ))}
                  </div>
                ) : inventory.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', textAlign: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 64, color: '#e9d5ff', marginBottom: 16 }}>inventory_2</span>
                    <p style={{ fontSize: 16, fontWeight: 600, color: '#1a0030' }}>No sarees registered yet</p>
                    <p style={{ fontSize: 13, color: '#6b5c7e', marginTop: 8 }}>Add your first heritage piece using the form.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
                    {inventory.map((item) => (
                      <div key={item.id} style={{ background: '#fff', border: '1px solid rgba(124,31,162,0.08)', borderRadius: 6, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(124,31,162,0.1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div style={{ position: 'relative', aspectRatio: '3/4', background: '#f5f0ff' }}>
                          {item.image_url ? (
                            <Image src={item.image_url} alt={item.name} fill style={{ objectFit: 'cover' }} unoptimized />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#d8b4fe' }}>photo_camera</span>
                            </div>
                          )}
                          <div style={{
                            position: 'absolute', top: 12, right: 12,
                            background: item.stock_status === 'Sold Out' ? '#be185d' : 'rgba(250,247,255,0.9)',
                            color: item.stock_status === 'Sold Out' ? '#fff' : '#1a0030',
                            padding: '4px 8px', borderRadius: 4,
                            fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                            backdropFilter: 'blur(4px)'
                          }}>
                            {item.stock_status}{item.stock_count ? ` (${item.stock_count})` : ''}
                          </div>
                        </div>
                        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <p style={{ fontSize: 9, fontWeight: 700, color: '#7c1fa2', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>{item.category}</p>
                          <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 600, color: '#1a0030', lineHeight: 1.2, marginBottom: 8 }}>{item.name}</h4>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(124,31,162,0.05)' }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: '#be185d' }}>₹{Number(item.price).toLocaleString('en-IN')}</p>
                            <button onClick={() => deleteItem(item.id, item.name, item.image_url)}
                              style={{ background: 'none', border: 'none', color: '#6b5c7e', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'color 0.2s' }}
                              onMouseEnter={e => e.currentTarget.style.color = '#be185d'} onMouseLeave={e => e.currentTarget.style.color = '#6b5c7e'}>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>

        {/* ─── TOAST ─── */}
        {toast && (
          <div style={{
            position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 200,
            background: toast.type === 'error' ? '#be185d' : '#1a0030', color: '#fff',
            padding: '12px 24px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)', fontSize: 13, fontWeight: 600,
            animation: 'fadeInUp 0.3s ease'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              {toast.type === 'error' ? 'error' : 'check_circle'}
            </span>
            {toast.msg}
          </div>
        )}
      </div>
    </>
  );
}
