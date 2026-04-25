'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session && pathname !== '/admin/login') {
        router.replace('/admin/login');
      } else if (session && pathname === '/admin/login') {
        router.replace('/admin');
      } else {
        if (session) setAuthenticated(true);
      }
      setLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setAuthenticated(false);
        router.replace('/');
      } else if (session) {
        setAuthenticated(true);
        if (pathname === '/admin/login') {
            router.replace('/admin');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', background: '#faf7ff', color: '#7c1fa2' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 48, animation: 'spin 1s linear infinite' }}>refresh</span>
      </div>
    );
  }

  // If on login page, render it
  if (pathname === '/admin/login') {
    return children;
  }

  // If on protected page and authenticated
  if (authenticated) {
    return children;
  }

  return null;
}
