import type { LayoutConfig, Seat, SeatCategory, SeatRowData } from "../types";
import { CATEGORY_OVERRIDES, EXIT_ROWS, OCCUPIED_SEATS, PRICE_BY_CATEGORY, TOTAL_ROWS } from "../types/seats";

function resolveCategory(row: number, column: string): SeatCategory {
    const seatId = `${row}${column}`

    if (CATEGORY_OVERRIDES[seatId]) return CATEGORY_OVERRIDES[seatId]
    if (EXIT_ROWS.includes(row)) return 'extra-legroom'
    if (row >= 3 && row <= 5) return 'premium'   //forward cabin
    return 'standard'
}

function createSeat(row: number, column: string): Seat {
    const id = `${row}${column}`

    const category = resolveCategory(row, column)

    return {
        id, row, column, category,
        price: PRICE_BY_CATEGORY[category],
        isOccupied: OCCUPIED_SEATS.has(id)
    }
}

export function generateSeatRows(layout: LayoutConfig): SeatRowData[] {
    return Array.from({ length: TOTAL_ROWS }, (_, i) => {
        const rowNumber = i + 1
        return {
            rowNumber,
            groups: layout.groups.map(col => col.map(cl => createSeat(rowNumber, cl)))
        }
    })
}
//Flat lookup 
export function flattenSeats(rows: SeatRowData[]): Seat[] {
    return rows.flatMap(row => row.groups.flat())
}
