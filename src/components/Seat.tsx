import type { Seat, SeatStatus } from "../types";
import { CATEGORY_LABEL } from "../types/seats";
import { formatPrice } from "../utils/pricing";
import { CATEGORY_STYLES, SEAT_SIZE, STATUS_STYLES } from "./seatStyles";

export function Seat({ seat, status, passengerNumber, onSelect }: {
    seat: Seat
    status: SeatStatus
    passengerNumber?: number
    onSelect?: (seatId: string) => void
}) {
    const style = status === 'available' ? CATEGORY_STYLES[seat.category] : STATUS_STYLES[status]
    const content = status === 'occupied' ? '✖️' : status === 'available' ? seat.column : passengerNumber

    const details = status === 'occupied' ? `Seat ${seat.id} - Booked` : `Seat ${seat.id} - ${CATEGORY_LABEL[seat.category]} - ${formatPrice(seat.price)}`

    return (
        <button type="button" title={details} aria-label={details} aria-disabled={status === 'occupied'} aria-pressed={status === 'selected'} onClick={() => onSelect?.(seat.id)}
            className={`${SEAT_SIZE} rounded-md border text-xs font-semibold transition colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${style}`}>
            {content}
        </button>
    )
}