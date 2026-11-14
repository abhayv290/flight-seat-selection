import { useBooking } from '../context/BookingContext'
import { MAX_PASSENGERS, MIN_PASSENGERS } from '../reducer/bookingReducer'

const stepperButton =
    'flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-lg font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white'

export function PassengerCountSelector() {
    const { state, actions } = useBooking()
    const count = state.passengers.length

    return (
        <div className="flex items-center justify-between">
            <span id="passenger-count-label" className="text-sm font-medium text-slate-700">
                Passengers
            </span>

            <div className="flex items-center gap-3" role="group" aria-labelledby="passenger-count-label">
                <button
                    type="button"
                    className={stepperButton}
                    aria-label="Remove a passenger"
                    disabled={count <= MIN_PASSENGERS}
                    onClick={() => actions.setPassengerCount(count - 1)}
                >
                    −
                </button>

                <output aria-live="polite" className="w-5 text-center text-lg font-semibold text-slate-900">
                    {count}
                </output>

                <button
                    type="button"
                    className={stepperButton}
                    aria-label="Add a passenger"
                    disabled={count >= MAX_PASSENGERS}
                    onClick={() => actions.setPassengerCount(count + 1)}
                >
                    +
                </button>
            </div>
        </div>
    )
}