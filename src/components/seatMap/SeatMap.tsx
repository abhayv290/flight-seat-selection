import { useBooking } from "../../context/BookingContext";
import { LAYOUTS } from "../../data/layout";
import { generateSeatRows } from "../../utils/seatHelpers";
import type { SeatHolder } from "../../types";
import { AISLE_GAP, ROW_LABEL_WIDTH, SEAT_GAP, SEAT_MAP_CARD, SEAT_SIZE } from "../seats/seatStyles";
import { SeatRow } from "../seats/SeatRow";


export function SeatMap() {
    const { state, actions } = useBooking()
    const layout = LAYOUTS[state.layout]

    const rows = generateSeatRows(layout)

    // seatId -> who holds it. Derived from passengers, never stored.
    const holders = new Map<string, SeatHolder>()
    state.passengers.forEach((p, index) => {
        if (p.seatId) holders.set(p.seatId, { passengerId: p.id, passengerNumber: index + 1 })
    })

    return (
        <div className={SEAT_MAP_CARD}>
            <div className="mx-auto w-fit space-y-1.5">
                {/* Column letters, built from the same groups so they line up */}
                <div className="flex items-center justify-center gap-2">
                    <span className={ROW_LABEL_WIDTH} />
                    <div className={`flex ${AISLE_GAP}`}>
                        {layout.groups.map((columns, groupIndex) => (
                            <div key={groupIndex} className={`flex ${SEAT_GAP}`}>
                                {columns.map((column) => (
                                    <span
                                        key={column}
                                        className={`${SEAT_SIZE} flex items-center justify-center text-xs font-medium text-slate-400`}
                                    >
                                        {column}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {rows.map((row) => (
                    <SeatRow
                        key={row.rowNumber}
                        row={row}
                        holders={holders}
                        activePassengerId={state.activePassengerId}
                        onSelectSeat={actions.assignSeat}
                    />
                ))}
            </div>
        </div>
    )
}