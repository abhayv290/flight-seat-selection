import { useBookingSummary } from '../hooks/useBookingSummary'
import { formatCurrency } from '../utils/pricing'
/** Mobile Only */
export function StickySummaryBar() {
    const { passengers, total, seatsSelected } = useBookingSummary()

    return (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
                <div>
                    <p className="text-xs text-slate-500">
                        {seatsSelected} of {passengers.length} seats selected
                    </p>
                    <p className="text-lg font-bold text-slate-900">{formatCurrency(total)}</p>
                </div>
                <a
                    href="#summary"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                    Details
                </a>
            </div>
        </div>
    )
}