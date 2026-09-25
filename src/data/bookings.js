const STORAGE_KEY = 'laundrygo-bookings';

// Replace these localStorage helpers with fetch calls when a REST API is available.

export function getBookings() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
}

export function saveBooking(booking) {
  const bookings = [booking, ...getBookings()];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  localStorage.setItem('laundrygo-current-booking', JSON.stringify(booking));
  return booking;
}

export function getCurrentBooking() {
  try { return JSON.parse(localStorage.getItem('laundrygo-current-booking')); } catch { return null; }
}

export function makeBookingId() { return `LG-${Math.random().toString(36).slice(2, 8).toUpperCase()}`; }