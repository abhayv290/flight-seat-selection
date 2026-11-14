const DELAY_MS = 800

/** Simulation a network call . visit /?setaMap-error to see the error state
 * the first attempt fails , retry succeeds 
 */
export function fetchSeatMap(attempt: number): Promise<void> {
    const shouldFail = new URLSearchParams(location.search).has('seatmap-error')

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail && attempt === 0) reject(new Error('Failed to load seat map'))
            else resolve()
        }, DELAY_MS);
    })
}
