import { useState } from 'react';

export default function Navbar({ page, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [{ id: 'home', label: 'Home' }, { id: 'services', label: 'Services' }, { id: 'booking', label: 'Book a service' }, { id: 'bookings', label: 'My bookings' }];
  function goTo(id) { navigate(id); setMenuOpen(false); }
  return <header className="site-header"><div className="nav-wrap"><button className="brand" onClick={() => goTo('home')} aria-label="LaundryGo home"><span className="brand-mark">L</span><span>Laundry<span>Go</span></span></button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" aria-expanded={menuOpen}><span /><span /><span /></button><nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>{links.map((link) => <button key={link.id} className={page === link.id ? 'active' : ''} onClick={() => goTo(link.id)}>{link.label}</button>)}<button className="nav-cta" onClick={() => goTo('booking')}>Book now <span>↗</span></button></nav></div></header>;
}