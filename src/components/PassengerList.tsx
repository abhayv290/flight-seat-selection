import { useBooking } from '../context/BookingContext'
import { MEAL_LOOKUP } from '../data/meals';
import { getSeatLookup } from '../utils/seatHelpers'
import { PassengerCard } from './PassengerCard'

export function PassengerList() {
    const { state, actions } = useBooking()
    const seatLookup = getSeatLookup(state.layout)

    return (
        <ul className="space-y-2">
            {state.passengers.map((passenger, index) => (
                <li key={passenger.id}>
                    <PassengerCard
                        passenger={passenger}
                        passengerNumber={index + 1}
                        seat={passenger.seatId ? seatLookup.get(passenger.seatId) : undefined}
                        meal={passenger.mealId ? MEAL_LOOKUP.get(passenger.mealId) : undefined}
                        isActive={passenger.id === state.activePassengerId}
                        onSelect={() => actions.setActivePassenger(passenger.id)}
                        onRemove={() => actions.removeSeat(passenger.id)}
                    />
                </li>
            ))}
        </ul>
    )
}