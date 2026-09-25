import ServiceCard from './ServiceCard';

export default function ServiceList({ services, onSelect }) {
  return <div className="service-grid">{services.map((service) => <ServiceCard key={service.id} service={service} onSelect={onSelect} />)}</div>;
}