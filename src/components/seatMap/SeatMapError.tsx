export function SeatMapError({ onRetry }: { onRetry: () => void }) {
    return (
        <div
            role="alert"
            className="flex flex-col items-center gap-3 rounded-3xl border border-red-200 bg-red-50 p-8 text-center"
        >
            <p className="text-sm font-semibold text-red-800">Couldn't load the seat map</p>
            <p className="text-sm text-red-700">
                Something went wrong while fetching the aircraft layout. Your passenger details are safe.
            </p>
            <button
                type="button"
                onClick={onRetry}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
                Try again
            </button>
        </div>
    )
}