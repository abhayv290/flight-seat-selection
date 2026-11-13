import { useReducer, type ReactNode } from "react";
import { BookingContext, type BookingActions } from "./BookingContext";
import { bookingReducer, initialState } from "../reducer/bookingReducer";

export function BookingProvider({ children }: {
    children: ReactNode
}) {
    const [state, dispatch] = useReducer(bookingReducer, initialState)

    const actions: BookingActions = {
        setPassengerCount: (count) => dispatch({ type: 'SET_PASSENGER_COUNT', count }),
        setActivePassenger: (passengerId) => dispatch({ type: 'SET_ACTIVE_PASSENGER', passengerId }),
        setLayout: (layout) => dispatch({ type: 'SET_LAYOUT', layout }),
        assignSeat: (seatId) => dispatch({ type: 'ASSIGN_SEAT', seatId }),
        removeSeat: (passengerId) => dispatch({ type: 'REMOVE_SEAT', passengerId }),
        dismissNotice: () => dispatch({ type: 'DISMISS_NOTICE' })
    }
    return <BookingContext.Provider value={{ state, actions }}>{children}</BookingContext.Provider>
}