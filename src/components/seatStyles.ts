import type { SeatCategory, SeatStatus } from '../types'

// Layout sizing (used by Seat, SeatRow and the column header)
export const SEAT_SIZE = 'h-8 w-8 sm:h-10 sm:w-10'
export const SEAT_GAP = 'gap-1.5'
export const AISLE_GAP = 'gap-3 sm:gap-8'
export const ROW_LABEL_WIDTH = 'w-6 shrink-0'

export const CATEGORY_STYLES: Record<SeatCategory, string> = {
    standard: 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100',
    premium: 'border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-100',
    'extra-legroom': 'border-violet-400 bg-violet-50 text-violet-800 hover:bg-violet-100',
}

export const STATUS_STYLES: Record<Exclude<SeatStatus, 'available'>, string> = {
    occupied: 'cursor-not-allowed border-slate-200 bg-slate-200 text-slate-400',
    selected: 'border-blue-600 bg-blue-600 text-white shadow-md',
    taken: 'border-emerald-500 bg-emerald-100 text-emerald-800',
}
export const SEAT_MAP_CARD = 'overflow-x-auto rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-6'

