import { describe, expect, it } from "vitest";
import type { Passenger } from "../types";
import { getSeatLookup } from "./seatHelpers";
import { formatCurrency, formatPrice, getPassengerCharges, getTotal } from "./pricing";

const lookup = getSeatLookup('3-2')

const passenger = (overrides: Partial<Passenger> = {}): Passenger => ({
    id: 'p1',
    name: 'Passenger 1',
    seatId: null,
    mealId: null,
    ...overrides
})

describe('getPassengerCharges', () => {
    it('charges nothing when  no seat or meal is choose', () => {
        expect(getPassengerCharges(passenger(), lookup).subTotal).toBe(0)
    })

    it('adds seat and meal prices', () => {
        const charges = getPassengerCharges(passenger({ seatId: '1C', mealId: 'veg-thali' }), lookup)
        expect(charges.seatPrice).toBe(350)
        expect(charges.mealPrice).toBe(299)
        expect(charges.subTotal).toBe(649)
    })

    it('treats a free seat as zero', () => {
        expect(getPassengerCharges(passenger({ seatId: '1A' }), lookup).seatPrice).toBe(0)
    })
})

describe('getTotal', () => {
    it('sums every passenger subTotal', () => {
        const charges = [
            getPassengerCharges(passenger({ id: 'p1', seatId: '1C' }), lookup),
            getPassengerCharges(passenger({ id: 'p2', seatId: '1E', mealId: 'sandwich' }), lookup),
        ]
        expect(getTotal(charges)).toBe(350 + 250 + 199)
    })
})

describe('formatting', () => {
    it('shows Free for a zero item price but ₹0 for a total', () => {
        expect(formatPrice(0)).toBe('Free')
        expect(formatCurrency(0)).toBe('Free')
    })
})