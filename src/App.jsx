import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ServiceList from './components/ServiceList';
import BookingForm from './components/BookingForm';
import BookingCard from './components/BookingCard';
import OrderTracker from './components/OrderTracker';
import { services } from './data/services';
import { getBookings, getCurrentBooking, makeBookingId, saveBooking } from './data/bookings';

function Home({ navigate }) {
  return <><section className="hero"><div className="hero-copy"><span className="eyebrow light">LAUNDRY, MADE LIGHTER</span><h1>More time for<br /><em>what matters.</em></h1><p>We collect, clean, and return your laundry fresh to your door. Simple service for busy lives.</p><button className="primary-button light-button" onClick={() => navigate('booking')}>Book a pickup <span>↗</span></button><div className="hero-proof"><span className="avatar-stack"><i>J</i><i>M</i><i>A</i></span><span><strong>4.9/5</strong> from 2,000+ happy customers</span></div></div><div className="hero-visual"><div className="sun-shape" /><div className="laundry-card card-one"><span className="mini-icon blue">✦</span><div><strong>Wash & Fold</strong><small>Ready tomorrow</small></div><b>✓</b></div><div className="laundry-card card-two"><span className="mini-icon coral">⌁</span><div><strong>Freshly pressed</strong><small>On its way to you</small></div><b>✓</b></div><div className="hero-sticker">GOOD<br />TO GO <span>✦</span></div><div className="clothes-shape"><div className="hanger" /><div className="shirt" /><div className="towel" /></div></div></section><section className="intro-section"><div><span className="eyebrow">THE EASY WAY TO FRESH</span><h2>Your laundry day,<br /><em>off your plate.</em></h2></div><p>From your first pickup to the final fold, LaundryGo makes laundry feel like one less thing to think about. Thoughtful care, right when you need it.</p></section><section className="home-services"><div className="section-heading"><div><span className="eyebrow">OUR SERVICES</span><h2>Pick your kind of fresh.</h2></div><button className="text-button" onClick={() => navigate('services')}>See all services <span>↗</span></button></div><ServiceList services={services.slice(0, 3)} onSelect={(id) => navigate('booking', id)} /></section><section className="how-section"><span className="eyebrow">HOW IT WORKS</span><h2>Three steps to<br /><em>more breathing room.</em></h2><div className="how-grid"><div><b>01</b><span className="how-icon">⌂</span><h3>Book a pickup</h3><p>Choose a service, tell us where to come, and pick a time that suits you.</p></div><div><b>02</b><span className="how-icon">✧</span><h3>We do the work</h3><p>Our local laundry partners give every item the careful attention it deserves.</p></div><div><b>03</b><span className="how-icon">↗</span><h3>Fresh at your door</h3><p>We return everything clean, crisp, and ready to fit back into your day.</p></div></div></section><section className="trust-strip"><span className="eyebrow">WHY LAUNDRYGO</span><div><strong>Local care.</strong><strong>Clear pricing.</strong><strong>Zero hassle.</strong></div></section></>;
}

function ServicesPage({ navigate }) { return <main className="page-shell"><div className="page-heading"><span className="eyebrow">SERVICES & PRICING</span><h1>Good care for<br /><em>every kind of load.</em></h1><p>Choose what you need and we will take it from there. Every service includes pickup and delivery.</p></div><ServiceList services={services} onSelect={(id) => navigate('booking', id)} /><div className="pricing-note"><span>✦</span><p><strong>Simple, upfront pricing.</strong> The price you see is the price you pay. No hidden fees, no awkward surprises.</p></div></main>; }

function Confirmation({ booking, navigate }) { return <main className="confirmation-page"><div className="confirmation-mark">✓</div><span className="eyebrow">BOOKING CONFIRMED</span><h1>That’s one less<br /><em>thing to think about.</em></h1><p className="confirmation-lead">We’ll see you on {booking.date} between {booking.time}. Your laundry is in good hands.</p><div className="confirmation-details"><div><span>BOOKING ID</span><strong>{booking.id}</strong></div><div><span>SERVICE</span><strong>{booking.service.name}</strong></div><div><span>PICKUP</span><strong>{booking.date}<br />{booking.time}</strong></div><div><span>TOTAL</span><strong>${booking.total.toFixed(2)}</strong></div><div className="wide"><span>ADDRESS</span><strong>{booking.address.street}, {booking.address.city}, {booking.address.postcode}</strong></div></div><div className="confirmation-actions"><button className="primary-button" onClick={() => navigate('track', booking)}>Track your order <span>↗</span></button><button className="back-button" onClick={() => navigate('home')}>Back to home</button></div></main>; }

function BookingsPage({ bookings, navigate }) { return <main className="page-shell bookings-page"><div className="page-heading compact-heading"><span className="eyebrow">YOUR LAUNDRY</span><h1>My bookings<span className="heading-dot">.</span></h1><p>Keep an eye on every pickup and delivery in one place.</p></div>{bookings.length === 0 ? <div className="empty-state"><span>✦</span><h2>No bookings yet</h2><p>Your next lighter day starts with a pickup.</p><button className="primary-button" onClick={() => navigate('booking')}>Book a service <span>↗</span></button></div> : <div className="bookings-list">{bookings.map((booking) => <BookingCard key={booking.id} booking={booking} onTrack={(item) => navigate('track', item)} />)}</div>}</main>; }

function TrackPage({ booking, navigate }) { return <main className="page-shell track-page"><button className="back-link" onClick={() => navigate('bookings')}>← My bookings</button><div className="track-heading"><div><span className="eyebrow">{booking.id}</span><h1>Your order is <em>on its way.</em></h1></div><span className="status-pill large">{booking.status}</span></div><div className="track-card"><div className="track-card-header"><div><span className="eyebrow">CURRENT ORDER</span><h2>{booking.service.name}</h2></div><strong>${booking.total.toFixed(2)}</strong></div><OrderTracker status={booking.status} /><div className="track-pickup"><span>⏱</span><div><strong>Pickup scheduled for {booking.date}</strong><p>{booking.time} · {booking.address.street}, {booking.address.city}</p></div></div></div><button className="text-button" onClick={() => navigate('booking')}>Book another service <span>↗</span></button></main>; }

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  useEffect(() => {
    setBookings(getBookings());
    setCurrentBooking(getCurrentBooking());
    try {
      const savedService = JSON.parse(localStorage.getItem('laundrygo-selected-service'));
      if (savedService) setSelectedService(savedService);
    } catch { /* A malformed local value should not block a fresh booking. */ }
  }, []);
  function navigate(nextPage, payload = null) { if (payload && payload.id && payload.service) setCurrentBooking(payload); else if (payload) { const service = services.find((item) => item.id === payload); setSelectedService(service); localStorage.setItem('laundrygo-selected-service', JSON.stringify(service)); } setPage(nextPage); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function completeBooking(details) { const saved = saveBooking({ ...details, id: makeBookingId(), status: 'Pickup Scheduled' }); setBookings(getBookings()); setCurrentBooking(saved); setPage('confirmation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  let content;
  if (page === 'home') content = <Home navigate={navigate} />;
  if (page === 'services') content = <ServicesPage navigate={navigate} />;
  if (page === 'booking') content = <main className="booking-page"><BookingForm services={services} initialService={selectedService} onComplete={completeBooking} /></main>;
  if (page === 'confirmation' && currentBooking) content = <Confirmation booking={currentBooking} navigate={navigate} />;
  if (page === 'bookings') content = <BookingsPage bookings={bookings} navigate={navigate} />;
  if (page === 'track' && currentBooking) content = <TrackPage booking={currentBooking} navigate={navigate} />;
  return <><Navbar page={page} navigate={navigate} />{content}<Footer navigate={navigate} /></>;
}