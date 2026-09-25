import { useState } from 'react';
import { clothingItems, timeSlots } from '../data/services';
import BookingSummary from './BookingSummary';

function tomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

export default function BookingForm({ services, initialService, onComplete }) {
  const [step, setStep] = useState(initialService ? 2 : 1);
  const [booking, setBooking] = useState({ service: initialService || null, quantity: 1, item: clothingItems[0], date: tomorrow(), time: '', address: { street: '', city: '', postcode: '' } });
  const [error, setError] = useState('');
  const service = booking.service;
  const total = service ? (service.price + booking.item.price) * booking.quantity : 0;
  const update = (key, value) => setBooking((current) => ({ ...current, [key]: value }));
  const updateAddress = (key, value) => setBooking((current) => ({ ...current, address: { ...current.address, [key]: value } }));

  function next() {
    setError('');
    if (step === 1 && !service) return setError('Please choose a service to continue.');
    if (step === 2 && (!booking.quantity || booking.quantity < 1 || booking.quantity > 10)) return setError('Choose a quantity between 1 and 10.');
    if (step === 3 && (!booking.date || booking.date < tomorrow())) return setError('Please choose a future pickup date.');
    if (step === 3 && !booking.time) return setError('Please choose a pickup time.');
    if (step === 4 && (!booking.address.street || !booking.address.city || !booking.address.postcode)) return setError('Please fill in your full pickup address.');
    setStep((current) => Math.min(5, current + 1));
  }

  return <div className="booking-layout"><div className="booking-main">
    <div className="stepper">{['Service', 'Items', 'Pickup', 'Address', 'Review'].map((label, index) => <div className={step >= index + 1 ? 'step active' : 'step'} key={label}><span>{index + 1}</span>{label}</div>)}</div>
    <div className="form-heading"><span className="eyebrow">STEP {step} OF 5</span><h1>{step === 1 ? 'What can we take care of?' : step === 2 ? 'Tell us about your laundry.' : step === 3 ? 'When should we pick it up?' : step === 4 ? 'Where should we collect it?' : 'Ready for a lighter week?'}</h1><p>{step === 1 ? 'Choose the service that suits your day.' : step === 2 ? 'A quick estimate helps us prepare the right space.' : step === 3 ? 'Pick a time that works with your rhythm.' : step === 4 ? 'We will come right to your door.' : 'Give everything a quick check before booking.'}</p></div>
    {step === 1 && <div className="form-service-list">{services.map((item) => <button className={`form-service-option ${service?.id === item.id ? 'selected' : ''}`} key={item.id} onClick={() => update('service', item)}><span className={`service-icon small ${item.color}`}>{item.icon}</span><span><strong>{item.name}</strong><small>{item.description}</small></span><b>${item.price}</b></button>)}</div>}
    {step === 2 && <div className="form-content"><div className="field-label">What are we caring for?</div><div className="item-options">{clothingItems.map((item) => <button className={`item-option ${booking.item.id === item.id ? 'selected' : ''}`} key={item.id} onClick={() => update('item', item)}><span><strong>{item.name}</strong><small>{item.detail}</small></span>{item.price > 0 && <b>+${item.price}</b>}</button>)}</div><div className="quantity-field"><label htmlFor="quantity">Quantity</label><div className="quantity-control"><button onClick={() => update('quantity', Math.max(1, booking.quantity - 1))} aria-label="Decrease quantity">−</button><input id="quantity" type="number" min="1" max="10" value={booking.quantity} onChange={(event) => update('quantity', Number(event.target.value))} /><button onClick={() => update('quantity', Math.min(10, booking.quantity + 1))} aria-label="Increase quantity">+</button></div></div></div>}
    {step === 3 && <div className="form-content"><label className="field-label" htmlFor="date">Pickup date</label><input className="input" id="date" type="date" min={tomorrow()} value={booking.date} onChange={(event) => update('date', event.target.value)} /><div className="field-label">Pickup window</div><div className="time-grid">{timeSlots.map((slot) => <button className={booking.time === slot ? 'selected' : ''} key={slot} onClick={() => update('time', slot)}>{slot}</button>)}</div></div>}
    {step === 4 && <div className="form-content address-form"><label className="field-label" htmlFor="street">Street address</label><input className="input" id="street" placeholder="e.g. 14 Maple Street" value={booking.address.street} onChange={(event) => updateAddress('street', event.target.value)} /><label className="field-label" htmlFor="city">City</label><input className="input" id="city" placeholder="e.g. Portland" value={booking.address.city} onChange={(event) => updateAddress('city', event.target.value)} /><label className="field-label" htmlFor="postcode">Postcode</label><input className="input" id="postcode" placeholder="e.g. 97205" value={booking.address.postcode} onChange={(event) => updateAddress('postcode', event.target.value)} /></div>}
    {step === 5 && <div className="review-card"><div className="review-row"><span>Service</span><strong>{service.name}</strong></div><div className="review-row"><span>Items</span><strong>{booking.quantity} × {booking.item.name}</strong></div><div className="review-row"><span>Pickup</span><strong>{booking.date} · {booking.time}</strong></div><div className="review-row"><span>Address</span><strong>{booking.address.street}, {booking.address.city}, {booking.address.postcode}</strong></div><div className="review-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div></div>}
    {error && <div className="form-error" role="alert">{error}</div>}
    <div className="form-actions">{step > (initialService ? 2 : 1) && <button className="back-button" onClick={() => { setError(''); setStep(step - 1); }}>← Back</button>}<button className="primary-button" onClick={step === 5 ? () => onComplete({ ...booking, total }) : next}>{step === 5 ? 'Confirm booking' : 'Continue'} <span>↗</span></button></div>
  </div><div className="booking-aside"><BookingSummary booking={booking} total={total} /><div className="secure-note"><span>✧</span><div><strong>Carefully handled</strong><p>Your clothes are sorted and cared for by our local team.</p></div></div></div></div>;
}