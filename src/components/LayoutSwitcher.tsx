import { useBooking } from '../context/BookingContext'
import { LAYOUT_LIST } from '../data/layout';

export function LayoutSwitcher() {
    const { state, actions } = useBooking()

    return (
        <div className="inline-flex rounded-lg bg-slate-200 p-1" role="group" aria-label="Aircraft layout">
            {LAYOUT_LIST.map((layout) => {
                const active = layout.id === state.layout
                return (
                    <button
                        key={layout.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => actions.setLayout(layout.id)}
                        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        {layout.label}
                    </button>
                )
            })}
        </div>
    )
}