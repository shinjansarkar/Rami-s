'use client';

export default function HoverCard({ feature }) {
  const { icon, title, desc, color, bg } = feature;

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(124,31,162,0.08)',
        padding: '40px 32px',
        borderRadius: 2,
        transition: 'all 0.35s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = `0 20px 50px ${color}25`;
        e.currentTarget.style.borderColor = `${color}30`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(124,31,162,0.08)';
      }}
    >
      <div style={{
        width: 52, height: 52,
        background: bg,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24,
      }}>
        <span className="material-symbols-outlined" style={{ color, fontSize: 22 }}>{icon}</span>
      </div>
      <h3 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 22, fontWeight: 600,
        color: '#1a0030', marginBottom: 12,
      }}>{title}</h3>
      <p style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: 13, color: '#6b5c7e', lineHeight: 1.8,
      }}>{desc}</p>
    </div>
  );
}
