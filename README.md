# LaundryGo

LaundryGo is a responsive laundry and ironing booking platform built as a portfolio project for an entry-level software developer. It gives customers a simple way to choose a service, schedule a pickup, review the cost, and track their order.

## Problem statement

Laundry is a recurring chore that is difficult to fit around work and family commitments. LaundryGo makes the experience more convenient by bringing service selection, pickup scheduling, and order tracking into one calm, clear interface.

## Features

- Responsive landing page with services, process, and trust content
- Wash & Fold, Wash & Iron, Ironing Only, and Dry Cleaning services
- Five-step booking flow with quantity controls and live price calculation
- Pickup date, time-slot, address, and form validation
- Booking confirmation with generated booking ID
- My Bookings page with empty, current, and previous booking states
- Order tracking timeline from booking confirmation to delivery
- Mobile navigation menu
- localStorage persistence for bookings, the current booking, and selected service
- Mock data and service modules that can later be replaced by API calls

## Technology stack

- React with JavaScript
- Vite for development and production builds
- HTML and CSS with a mobile-first responsive layout
- Browser localStorage for local persistence

No backend or third-party UI library is required for this version.

## Project structure

```text
src/
	components/       Reusable navigation, cards, forms, summaries, and tracker UI
	data/              Mock service data and localStorage booking data helpers
	App.jsx            Page state and high-level application flow
	main.jsx           React entry point
	styles.css         Responsive design system and page styling
index.html           Application HTML entry point
```

## How the booking flow works

1. Choose a service from the home page, services page, or booking page.
2. Select a laundry category and quantity. The total updates immediately.
3. Choose a pickup date and time window.
4. Add a complete pickup address.
5. Review the order and confirm it.
6. LaundryGo generates an ID, stores the booking locally, and shows a confirmation page.

## How localStorage is used

The `src/data/bookings.js` module provides a small data layer around localStorage. Bookings are stored under `laundrygo-bookings`, while the latest booking and selected service are stored separately so they can be restored after a refresh. In a production app, this module would instead call authenticated REST API endpoints.

## Connecting to a REST API later

The current components receive service and booking data through props, and booking persistence is isolated in `src/data/bookings.js`. A REST implementation could replace those helpers with functions such as `GET /services`, `POST /bookings`, and `GET /bookings/:id` without changing the presentation components. Authentication, server-side validation, payment, and live status updates would be added at that boundary.

## How to run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
```

## Future improvements

- Add user accounts and secure authentication
- Connect to a real payments provider
- Add service-area and address validation
- Add a real backend with provider availability and live order statuses
- Add email/SMS pickup reminders
- Add automated unit and end-to-end tests

## Interview topics I can discuss

- Designing a multi-step form with React state
- Separating UI components from data and persistence logic
- Client-side validation and accessible error messages
- Responsive CSS layout and mobile navigation
- Deriving prices from user selections
- Replacing a mock data layer with REST API calls
- Tradeoffs of localStorage for a frontend-only prototype
