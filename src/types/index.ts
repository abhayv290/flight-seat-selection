export type LayoutId = '3-2' | '2-3-2'

export type SeatCategory = 'standard' | 'premium' | 'extra-legroom'

export interface Seat {
    id: string  // "12C (unique key) "
    row: number   //12
    column: string  //C
    category: SeatCategory
    price: number
    isOccupied: boolean
}

//One row of the plane 
export interface SeatRowData {
    rowNumber: number
    groups: Seat[][]  // 3-2 => 2 groups , 2-3-3 => 3 groups 
}

export interface LayoutConfig {
    id: LayoutId
    label: string
    groups: string[][]
}


export interface Passenger {
    id: string
    name: string
    seatId: string | null
    mealId: string | null
}

export interface Notice {
    type: 'error' | 'info'
    message: string
}
export interface BookingState {
    layout: LayoutId
    activePassengerId: string
    passengers: Passenger[]
    notice: Notice | null
}

export type BookingAction =
    { type: 'SET_PASSENGER_COUNT'; count: number }
    | { type: 'SET_ACTIVE_PASSENGER'; passengerId: string }
    | { type: 'SET_LAYOUT'; layout: LayoutId }
    | { type: 'ASSIGN_SEAT'; seatId: string }
    | { type: 'REMOVE_SEAT'; passengerId: string }
    | { type: 'DISMISS_NOTICE'; }