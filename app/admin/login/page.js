'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Invalid credentials');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a0030 0%, #3b0764 100%)',
      fontFamily: 'Outfit, sans-serif'
    }}>
      <div style={{
        background: 'rgba(250, 247, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '48px',
        borderRadius: '12px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        width: '100%',
        maxWidth: '420px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 36,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #7c1fa2, #be185d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 8
          }}>
            Login
          </h1>
          <p style={{ color: '#6b5c7e', fontSize: 13, letterSpacing: '0.05em' }}>
            Secure access for Romi&apos;s administration.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c1fa2', marginBottom: 8 }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #e9d5ff',
                padding: '8px 0', fontSize: 14, color: '#1a0030', outline: 'none', transition: 'border-color 0.3s'
              }}
              onFocus={e => e.currentTarget.style.borderBottomColor = '#7c1fa2'}
              onBlur={e => e.currentTarget.style.borderBottomColor = '#e9d5ff'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c1fa2', marginBottom: 8 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #e9d5ff',
                  padding: '8px 32px 8px 0', fontSize: 14, color: '#1a0030', outline: 'none', transition: 'border-color 0.3s'
                }}
                onFocus={e => e.currentTarget.style.borderBottomColor = '#7c1fa2'}
                onBlur={e => e.currentTarget.style.borderBottomColor = '#e9d5ff'}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 24,
                  height: 24,
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  cursor: 'pointer',
                  color: '#7c1fa2'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <span
                  key={showPassword ? 'open' : 'closed'}
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, lineHeight: 1, animation: 'eyeBlink 0.22s ease' }}
                >
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

          {error && (
            <div style={{ color: '#be185d', fontSize: 13, textAlign: 'center', background: 'rgba(190,24,93,0.1)', padding: '8px', borderRadius: '4px' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #7c1fa2 0%, #be185d 100%)',
              color: '#fff', padding: '16px', borderRadius: 6,
              fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
              transition: 'transform 0.3s, box-shadow 0.3s',
              marginTop: 16
            }}
            onMouseEnter={e => { if(!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(124,31,162,0.3)'; } }}
            onMouseLeave={e => { if(!loading) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; } }}
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
      <style>{`
        @keyframes eyeBlink {
          0% { transform: scaleY(1); opacity: 1; }
          45% { transform: scaleY(0.15); opacity: 0.9; }
          100% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
