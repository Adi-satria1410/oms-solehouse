import type { ShippingAddress } from '../../types'

import { addressFields } from '../../data/addressFields'

export default function AddressFields({ errors, onEdit }: { errors: Partial<Record<keyof ShippingAddress, string>>; onEdit: (field: keyof ShippingAddress) => void }) {
  return <div className="grid gap-5 sm:grid-cols-2">{addressFields.map(field => <div key={field.name} className={field.wide ? 'sm:col-span-2' : ''}>
    <label htmlFor={`address-${field.name}`} className="text-caption font-medium">{field.label}{field.name !== 'note' && <span aria-hidden="true"> *</span>}</label>
    <input id={`address-${field.name}`} name={field.name} type={field.type ?? 'text'} autoComplete={field.autoComplete} required={field.name !== 'note'} maxLength={field.name === 'street' || field.name === 'note' ? 500 : field.name === 'postalCode' ? 5 : 120} inputMode={field.name === 'postalCode' ? 'numeric' : undefined} onChange={() => onEdit(field.name)} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} className={`field mt-2 w-full ${errors[field.name] ? 'border-accent' : ''}`} />
    {errors[field.name] && <p id={`error-${field.name}`} className="mt-2 text-caption text-accent-hover">{errors[field.name]}</p>}
  </div>)}</div>
}
