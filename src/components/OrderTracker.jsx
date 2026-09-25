const steps = ['Booking confirmed', 'Pickup scheduled', 'Picked up', 'Processing', 'Out for delivery', 'Delivered'];

export default function OrderTracker({ status = 'Pickup Scheduled' }) {
  const statusIndex = Math.max(0, steps.findIndex((step) => step.toLowerCase() === status.toLowerCase()));
  return <div className="tracker">{steps.map((step, index) => <div className={`tracker-step ${index <= statusIndex ? 'complete' : ''} ${index === statusIndex ? 'current' : ''}`} key={step}><div className="tracker-dot">{index < statusIndex ? '✓' : index + 1}</div><span>{step}</span>{index < steps.length - 1 && <div className="tracker-line" />}</div>)}</div>;
}