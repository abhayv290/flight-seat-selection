import { useSeatMapLoader } from "../hooks/useSeatMapLoader";
import { LayoutSwitcher } from "./LayoutSwitcher";
import { Legend } from "./Legend";
import { SeatMap } from "./seatMap/SeatMap";
import { SeatMapError } from "./SeatMapError";
import { SeatMapSkeleton } from "./SeatMapSkeleton";

export function SeatMapSection() {
    const { status, retry } = useSeatMapLoader()

    return (
        <section className="space-y-4 lg:col-start-1 lg:row-start-1">
            <LayoutSwitcher />
            <Legend />
            {status === 'loading' && <SeatMapSkeleton />}
            {status === 'error' && <SeatMapError onRetry={retry} />}
            {status === 'ready' && <SeatMap />}
        </section>
    )
}