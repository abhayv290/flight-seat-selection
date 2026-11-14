import type { SeatHolder, SeatRowData } from "../../types";
import { getSeatStatus } from "../../utils/seatHelpers";
import { Seat } from "./Seat";
import { AISLE_GAP, ROW_LABEL_WIDTH, SEAT_GAP } from "./seatStyles";

export function SeatRow({ row, holders, activePassengerId, onSelectSeat }: {
    row: SeatRowData
    holders: Map<string, SeatHolder>
    activePassengerId: string
    onSelectSeat?: (seatId: string) => void
}) {
    return (
        <div className="flex items-center justify-center gap-2">
            <span className={`${ROW_LABEL_WIDTH} text-right text-xs font-medium text-slate-500`}>{row.rowNumber}</span>
            <div className={`${AISLE_GAP} flex`}>
                {row.groups.map((group, index) => (
                    <div key={index} className={`flex ${SEAT_GAP}`}>
                        {group.map(seat => {
                            const holder = holders.get(seat.id)
                            return (
                                <Seat key={seat.id} seat={seat}
                                    status={getSeatStatus(seat, holder, activePassengerId)}
                                    passengerNumber={holder?.passengerNumber}
                                    onSelect={onSelectSeat} />
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}