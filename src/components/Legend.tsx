import type { SeatCategory } from "../types";
import { CATEGORY_LABEL, PRICE_BY_CATEGORY } from "../types/seats";
import { formatPrice } from "../utils/pricing";
import { CATEGORY_STYLES, STATUS_STYLES } from "./seatStyles";


const categories = Object.keys(CATEGORY_LABEL) as SeatCategory[]

const legendItems = [
    ...categories.map((category) => ({
        label: `${CATEGORY_LABEL[category]} · ${formatPrice(PRICE_BY_CATEGORY[category])}`,
        style: CATEGORY_STYLES[category],
    })),
    { label: 'Your seat', style: STATUS_STYLES.selected },
    { label: 'Other passenger', style: STATUS_STYLES.taken },
    { label: 'Booked', style: STATUS_STYLES.occupied },
]

export function Legend() {
    return (
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
            {legendItems.map((item) => (
                <li key={item.label} className="flex items-center gap-1.5">
                    <span className={`h-4 w-4 rounded border ${item.style}`} />
                    {item.label}
                </li>
            ))}
        </ul>
    )
}