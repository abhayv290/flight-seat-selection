import { MEAL_LOOKUP } from "../data/meals";
import type { Passenger, PassengerCharges, Seat } from "../types";

export function formatPrice(amount: number): string {
    return amount === 0 ? 'Free' : amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
}

/** for a single item : 0 read as 'Free */
export function formatCurrency(amount: number): string {
    return amount === 0 ? 'Free' : formatPrice(amount)
}

export function getPassengerCharges(
    passenger: Passenger,
    seatLookup: Map<string, Seat>
): PassengerCharges {
    const seat = passenger.seatId ? seatLookup.get(passenger.seatId) : undefined
    const seatPrice = seat?.price ?? 0
    const meal = passenger.mealId ? MEAL_LOOKUP.get(passenger.mealId) : undefined
    const mealPrice = meal?.price ?? 0
    return {
        passengerId: passenger.id,
        seat,
        seatPrice,
        meal,
        mealPrice,
        subTotal: seatPrice + mealPrice
    }
}

export function getTotal(charges: PassengerCharges[]): number {
    return charges.reduce((sum, acc) => sum + acc.subTotal, 0)
}