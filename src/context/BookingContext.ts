import { createContext, useContext } from "react";
import type { BookingState, LayoutId } from "../types";

export interface BookingActions {
    setPassengerCount: (count: number) => void
    setActivePassenger: (passengerId: string) => void
    setLayout: (layout: LayoutId) => void
    assignSeat: (seatId: string) => void
    removeSeat: (passengerId: string) => void
    dismissNotice: () => void
}

export interface BookingContextValue {
    state: BookingState
    actions: BookingActions
}

export const BookingContext = createContext<BookingContextValue | null>(null)

export function useBooking(): BookingContextValue {
    const ctx = useContext(BookingContext)
    if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
    return ctx
}

