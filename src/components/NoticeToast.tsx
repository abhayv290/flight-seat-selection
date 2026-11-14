import { useEffect } from "react";
import { useBooking } from "../context/BookingContext";

const ERROR_AUTO_DISMISS_MS = 4000
export function NoticeToast() {
    const { state, actions } = useBooking()
    const { notice } = state


    /** Error disappear on their own : info notices wait for the user */
    useEffect(() => {
        if (notice?.type !== 'error') return
        const timer = setTimeout(actions.dismissNotice, ERROR_AUTO_DISMISS_MS)
        return () => clearTimeout(timer)
    }, [notice, actions])

    if (!notice) return null

    const isError = notice.type === 'error'
    return (
        <div className="pointer-events-none fixed inset-x-4 bottom-24 z-50 flex justify-center lg:bottom-4 ">
            <div role={isError ? 'alert' : 'status'}
                className={`pointer-events-auto fle xw-full max-w-md items-start gap-3 rounded -xl px-4 py-3 text-sm shadow-lg ${isError ? 'bg-red-500 text-white' : 'bg-slate-900 text-white'} `}>
                <span className="flex-1">{notice.message}</span>
                <button type="button"
                    aria-label={'Dismiss Message'} onClick={actions.dismissNotice}
                    className="rounded px-1 text-lg leading-none opacity-80  hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    ✖️
                </button>
            </div>
        </div>
    )
}
