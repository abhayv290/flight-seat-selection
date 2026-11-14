import { CATEGORY_LABEL } from '../data/seats'
import type { Meal, Passenger, Seat } from '../types'
import { formatPrice } from '../utils/pricing'

interface PassengerCardProps {
    passenger: Passenger
    passengerNumber: number
    seat?: Seat
    meal?: Meal
    isActive: boolean
    onSelect: () => void
    onRemove: () => void
}

export function PassengerCard({
    passenger,
    passengerNumber,
    seat,
    meal,
    isActive,
    onSelect,
    onRemove,
}: PassengerCardProps) {
    // Badge colors mirror the seat states on the map
    const badgeStyle = isActive
        ? 'bg-blue-600 text-white'
        : seat
            ? 'bg-emerald-100 text-emerald-800'
            : 'bg-slate-100 text-slate-500'

    return (
        <div
            className={`rounded-xl border bg-white transition-colors ${isActive ? 'border-blue-600 ring-1 ring-blue-600' : 'border-slate-200 hover:border-slate-300'
                }`}
        >
            <button
                type="button"
                aria-pressed={isActive}
                onClick={onSelect}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
                <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${badgeStyle}`}
                >
                    {passengerNumber}
                </span>

                <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-slate-900">
                        {passenger.name}
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                        {seat
                            ? `Seat ${seat.id} · ${CATEGORY_LABEL[seat.category]}`
                            : isActive
                                ? 'Pick a seat on the map'
                                : 'No seat selected'}
                    </span>
                </span>

                {seat && (
                    <span className="text-sm font-semibold text-slate-700">{formatPrice(seat.price)}</span>
                )}
                {meal && (
                    <span className='block truncate text-xs text-slate-500 '>🍴 {meal.name}</span>
                )}
            </button>
            {seat && <div className='border-t border-slate-100 px-3 py-2 text-right'>
                <button type='button' aria-label={`Remove Seat ${seat.id} from ${passenger.id}`}
                    onClick={onRemove}
                    className='rounded text-xs font-medium text-red-600 hover:text-red-700 hover:underline focus:visible:ring-red-500'>Remove Seat</button>
            </div>}

        </div>
    )
}