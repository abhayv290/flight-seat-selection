import type { BookingAction, BookingState } from "../types";
import { bookingReducer, initialState } from "./bookingReducer";
import { describe, it, expect } from 'vitest'

/** Run a sequence  of actions from the Initial state */
function run(...actions: BookingAction[]): BookingState {
    return actions.reduce(bookingReducer, initialState)
}

const assign = (seatId: string): BookingAction => ({ type: 'ASSIGN_SEAT', seatId })
const count = (n: number): BookingAction => ({ type: 'SET_PASSENGER_COUNT', count: n })

describe('ASSIGN_SEAT', () => {
    it('assigns a free seat to the active passenger', () => {
        const state = run(assign('1A'))
        expect(state.passengers[0].seatId).toBe('1A')
        expect(state.notice).toBeNull()
    })
    it('rejects an occupied seat with an error notice', () => {
        const state = run(assign('1B'))
        expect(state.passengers[0].seatId).toBeNull()
        expect(state.notice?.type).toBe('error')
    })
    it('rejects a seat held by another passenger', () => {
        //After of takes 1A,auto advance makes p2 active
        const state = run(count(2), assign('1A'), assign('1A'))
        expect(state.passengers[0].seatId).toBe('1A')
        expect(state.passengers[1].seatId).toBeNull()
        expect(state.notice?.type).toBe('error')
    })
    it('replaces the previous seat when a passenger picks another ', () => {
        const state = run(assign('1A'), assign('2B'))
        expect(state.passengers[0].seatId).toBe('2B')
    })
    it('toggles of when a passenger clicks their own seat', () => {
        const state = run(assign('1A'), assign('1A'))
        expect(state.passengers[0].seatId).toBeNull()
    })
    it('rejects a seat that does not exist in the current layout', () => {
        const state = run(assign('8G')) //G only exist in 2-3-2 layout
        expect(state.passengers[0].seatId).toBeNull()
        expect(state.notice?.type).toBe('error')
    })
})

describe('auto-advance', () => {
    it('moves to the next passenger without a seat after a first assignment', () => {
        const state = run(count(2), assign('1A'))
        expect(state.activePassengerId).toBe('p2')
    })
    it('stays on the same passenger when changing an existing seat', () => {
        const state = run(count(2), assign('1A'), { type: 'SET_ACTIVE_PASSENGER', passengerId: 'p1' }, assign('2B'))
        expect(state.activePassengerId).toBe('p1')
    })
})

describe('SET_LAYOUT', () => {
    it('unassigns seat that do not exist in the new layout and notifies', () => {
        const state = run(
            { type: 'SET_LAYOUT', layout: '2-3-2' },
            assign('8G'),
            { type: 'SET_LAYOUT', layout: '3-2' }
        )
        expect(state.passengers[0].seatId).toBeNull()
        expect(state.notice?.type).toBe('info')
    })
    it('keeps seats that exist in both layouts', () => {
        const state = run(assign('1A'), { type: 'SET_LAYOUT', layout: '2-3-2' })
        expect(state.passengers[0].seatId).toBe('1A')
    })
})

describe('SET_PASSENGER_COUNT', () => {
    it('clamps to the allowed range', () => {
        expect(run(count(99)).passengers).toHaveLength(6)
        expect(run(count(0)).passengers).toHaveLength(1)
    })

    it('releases seats of removed passengers and keeps the rest', () => {
        const state = run(count(2), assign('1A'), assign('2B'), count(1))
        expect(state.passengers).toHaveLength(1)
        expect(state.passengers[0].seatId).toBe('1A')
        expect(state.notice?.type).toBe('info')
    })
})