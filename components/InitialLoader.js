'use client';
import { useState, useEffect } from 'react';

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if we already showed the loader in this session
    const hasLoaded = sessionStorage.getItem('romis_loaded');
    
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Sequence the loading animation
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    const timer2 = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('romis_loaded', 'true');
    }, 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!loading) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#1a0030',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
      opacity: fadeOut ? 0 : 1,
      transform: fadeOut ? 'translateY(-10px)' : 'translateY(0)',
      pointerEvents: 'none'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
      }}>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 64,
          fontStyle: 'italic',
          fontWeight: 600,
          background: 'linear-gradient(135deg, #d8b4fe 0%, #f9a8d4 50%, #fb923c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: 0,
          animation: 'revealText 1.5s ease-out forwards',
        }}>
          Romi&apos;s
        </h1>
        <div style={{
          width: 2,
          height: 60,
          background: 'linear-gradient(180deg, transparent, #be185d, transparent)',
          opacity: 0,
          animation: 'revealLine 1s ease-out 0.5s forwards',
        }} />
      </div>

      <style>{`
        @keyframes revealText {
          0% { opacity: 0; transform: translateY(20px); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes revealLine {
          0% { opacity: 0; transform: scaleY(0); }
          100% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
