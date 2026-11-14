import type { BookingAction, BookingState, Notice, Passenger } from "../types";
import { LAYOUTS } from "../data/layout";
import { getSeatLookup } from "../utils/seatHelpers";

export const MIN_PASSENGERS = 1
export const MAX_PASSENGERS = 6

function createPassenger(n: number): Passenger {
    return { id: `p${n}`, name: `Passenger ${n}`, seatId: null, mealId: null }
}


export const initialState: BookingState = {
    layout: '3-2',
    passengers: [createPassenger(1)],
    activePassengerId: 'p1',
    notice: null
}

function withNotice(state: BookingState, notice: Notice): BookingState {
    return { ...state, notice }
}

function updatePassenger(
    passengers: Passenger[],
    id: string,
    patch: Partial<Passenger>,
): Passenger[] {
    return passengers.map(ps => ps.id === id ? { ...ps, ...patch } : ps)
}

/** Next passenger- who has no seat yet*/
function findNextWithoutSeat(passenger: Passenger[], fromIndex: number): Passenger | undefined {
    for (let step = 1; step < passenger.length; step++) {
        const candidate = passenger[(fromIndex + step) % passenger.length]
        if (!candidate.seatId) return candidate
    }
    return undefined
}

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
    switch (action.type) {
        case 'SET_PASSENGER_COUNT': {
            const count = Math.min(MAX_PASSENGERS, Math.max(MIN_PASSENGERS, action.count))
            const current = state.passengers

            const passengers = count >= current.length ? [
                ...current,
                ...Array.from({ length: count - current.length }, (_, i) => createPassenger(i + current.length + 1))
            ] : current.slice(0, count)

            const activeStillExists = passengers.some(p => p.id === state.activePassengerId)
            const released = current.slice(count).filter(p => p.seatId).length

            return {
                ...state,
                passengers,
                activePassengerId: activeStillExists ? state.activePassengerId : passengers[0].id,
                notice: released > 0 ? { type: 'info', message: `${released} seat(s) were released` } : null
            }
        }
        case 'SET_ACTIVE_PASSENGER': {
            if (!state.passengers.some(p => p.id === action.passengerId)) return state
            return { ...state, activePassengerId: action.passengerId, notice: null }
        }

        case 'SET_LAYOUT': {
            if (action.layout === state.layout) return state
            const lookup = getSeatLookup(action.layout)
            let cleared = 0
            const passengers = state.passengers.map(p => {
                if (p.seatId && !lookup.has(p.seatId)) {
                    cleared++
                    return { ...p, seatId: null }
                }
                return p
            })
            return {
                ...state,
                layout: action.layout,
                passengers,
                notice: cleared > 0 ? { type: 'info', message: `${cleared} seat(s) don't exist in the ${LAYOUTS[action.layout].label} layout and were unassigned` } : null
            }
        }
        case 'ASSIGN_SEAT': {
            const seat = getSeatLookup(state.layout).get(action.seatId)
            if (!seat) {
                return withNotice(state, { type: 'error', message: 'That seat does not exist in this layout' })
            }
            if (seat.isOccupied) {
                return withNotice(state, { type: 'error', message: `seat ${seat.id} is already booked ` })
            }

            const holder = state.passengers.find(p => p.seatId === seat.id)

            //Someone else has it -reject
            if (holder && holder.id !== state.activePassengerId) {
                return withNotice(state, { type: 'error', message: `Seat ${seat.id} is already taken by ${holder.name}` })
            }

            //Active passenger clicked their own seat -> toggle if off
            if (holder) {
                return {
                    ...state,
                    passengers: updatePassenger(state.passengers, holder.id, { seatId: null }),
                    notice: null
                }
            }

            //Free Seat => assign this also changes a previous seat automatically
            const activeIndex = state.passengers.findIndex(p => p.id === state.activePassengerId)
            const hadSeatBefore = state.passengers[activeIndex].seatId !== null
            const passengers = updatePassenger(state.passengers, state.activePassengerId, { seatId: seat.id })

            //Auto advance only on first a first time assignment
            const nextPassenger = hadSeatBefore ? undefined : findNextWithoutSeat(passengers, activeIndex)
            return {
                ...state,
                passengers,
                activePassengerId: nextPassenger?.id ?? state.activePassengerId,
                notice: null
            }
        }

        case 'REMOVE_SEAT': {
            return {
                ...state,
                passengers: updatePassenger(state.passengers, action.passengerId, { seatId: null }),
                notice: null
            }
        }
        case 'DISMISS_NOTICE': {
            return { ...state, notice: null }
        }
        default:
            return state
    }
}