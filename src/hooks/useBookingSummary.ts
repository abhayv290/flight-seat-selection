import { useBooking } from "../context/BookingContext";
import { getPassengerCharges, getTotal } from "../utils/pricing";
import { getSeatLookup } from "../utils/seatHelpers";

export function useBookingSummary() {
    const { state } = useBooking()
    const seatLookup = getSeatLookup(state.layout)

    const charges = state.passengers.map(p => getPassengerCharges(p, seatLookup))
    const total = getTotal(charges)
    const seatsSelected = charges.filter(c => c.seat).length

    return { passengers: state.passengers, charges, total, seatsSelected }
}