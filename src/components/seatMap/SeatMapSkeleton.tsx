import { useBooking } from "../../context/BookingContext";
import { LAYOUTS } from "../../data/layout";
import { TOTAL_ROWS } from "../../data/seats";
import { AISLE_GAP, ROW_LABEL_WIDTH, SEAT_GAP, SEAT_MAP_CARD, SEAT_SIZE } from "../seats/seatStyles";

export function SeatMapSkeleton() {
    const { state } = useBooking()
    const { groups } = LAYOUTS[state.layout]

    return (
        <div role="status" aria-busy='true' className={SEAT_MAP_CARD}>
            <span className="sr-only"> Loading Seat Map</span>
            <div className="mx-auto  w-fit space-y-1.5 motion-safe:animate-pulse" aria-hidden='true'>
                {Array.from({ length: TOTAL_ROWS }, (_, row) => (
                    <div key={row} className="flex items-center justify-center gap-2" >
                        <span className={ROW_LABEL_WIDTH} />
                        <div className={`flex ${AISLE_GAP}`}>
                            {groups.map((column, index) => (
                                <div key={index} className={`flex ${SEAT_GAP}`} >
                                    {column.map(cl => (
                                        <span key={cl} className={`${SEAT_SIZE} rounded-md bg-slate-200`}></span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}