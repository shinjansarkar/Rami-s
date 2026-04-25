'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftLinks = [
    { href: '/', label: 'Home' },
    { href: '/collection', label: 'Collection' },
  ];

  const rightLinks = [
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar" style={{ position: 'relative', zIndex: 101 }}>
        ✦ Free delivery across Kolkata &nbsp;·&nbsp; Authentic hand-woven Bengali sarees ✦
      </div>

      {/* Navbar */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Left links */}
          <div>
            <ul className="nav-links hidden md:flex">
              {leftLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={pathname === href ? 'active' : ''}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <Link href="/" className="nav-logo">
            Romi&apos;s
          </Link>

          {/* Right links + icons */}
          <div className="nav-right">
            <ul className="nav-links hidden md:flex">
              {rightLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={pathname === href ? 'active' : ''}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Icons */}
            <div className="hidden md:flex items-center gap-4 ml-4">
              <Link href="/admin" aria-label="Admin"
                style={{ color: '#7c1fa2', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#be185d'}
                onMouseLeave={e => e.currentTarget.style.color = '#7c1fa2'}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>person</span>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 22, height: 1.5,
                  background: '#7c1fa2',
                  transition: 'all 0.3s ease',
                  transformOrigin: 'center',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(3px, 3px)'
                      : i === 1 ? 'scaleX(0)'
                        : 'rotate(-45deg) translate(3px, -3px)'
                    : 'none'
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            background: 'rgba(250,247,255,0.97)',
            borderTop: '1px solid rgba(124,31,162,0.1)',
            padding: '24px 40px 32px',
          }}>
            {[...leftLinks, ...rightLinks, { href: '/admin', label: 'Admin' }].map(({ href, label }) => (
              <Link key={href} href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', padding: '14px 0',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: pathname === href ? '#7c1fa2' : '#6b5c7e',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(124,31,162,0.07)',
                }}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
