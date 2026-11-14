
import { CATEGORY_LABEL } from '../data/seats';
import { useBookingSummary } from '../hooks/useBookingSummary';
import { formatCurrency, formatPrice } from '../utils/pricing'

export function PriceSummary() {
    const { passengers, charges, total, seatsSelected } = useBookingSummary()

    return (
        <section
            id="summary"
            aria-labelledby="summary-title"
            className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
            <h2 id="summary-title" className="text-sm font-semibold text-slate-900">
                Price summary
            </h2>

            {seatsSelected === 0 && (
                <p className="text-sm text-slate-500">No seats selected yet. Pick a seat on the map.</p>
            )}

            <ul className="divide-y divide-slate-100">
                {charges.map((charge, index) => (
                    <li key={charge.passengerId} className="flex items-start justify-between gap-3 py-2">
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-800">
                                {passengers[index].name}
                            </p>
                            <p className="text-xs text-slate-500">
                                {charge.seat
                                    ? `Seat ${charge.seat.id} · ${CATEGORY_LABEL[charge.seat.category]}`
                                    : 'No seat selected'}
                            </p>
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                            {charge.seat ? formatPrice(charge.seatPrice) : '—'}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="text-sm font-semibold text-slate-900">Total</span>
                <output aria-live="polite" className="text-xl font-bold text-slate-900">
                    {formatCurrency(total)}
                </output>
            </div>
        </section>
    )
}