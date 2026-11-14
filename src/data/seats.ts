import type { SeatCategory } from '../types'

export const TOTAL_ROWS = 12

export const PRICE_BY_CATEGORY: Record<SeatCategory, number> = {
    standard: 0,
    premium: 250,
    'extra-legroom': 350,
}

export const CATEGORY_LABEL: Record<SeatCategory, string> = {
    standard: 'Standard',
    premium: 'Premium',
    'extra-legroom': 'Extra-Legroom'
}

//Exit rows have extra legroom
export const EXIT_ROWS = [7]

// sample data from the assessment PDF
export const CATEGORY_OVERRIDES: Record<string, SeatCategory> = {
    '1A': 'standard',
    '1B': 'standard',
    '1C': 'extra-legroom',
    '1D': 'standard',
    '1E': 'premium',
    '2A': 'extra-legroom',
    '2B': 'standard',
}

// Mock "already booked" seats
export const OCCUPIED_SEATS = new Set([
    '1B', '2C', '3A', '3B', '4D', '4F', '5C', '6E', '6G',
    '7A', '8D', '9B', '9C', '9F', '10E', '11A', '12D',
])