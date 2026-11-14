import { useEffect, useState } from "react";
import { fetchSeatMap } from "../api/mockSeatApi";

type LoadStatus = 'loading' | 'error' | 'ready'

export function useSeatMapLoader() {
    const [status, setStatus] = useState<LoadStatus>('loading')
    const [attempt, setAttempt] = useState(0)

    useEffect(() => {
        let cancelled = false
        fetchSeatMap(attempt).then(() => {
            if (!cancelled) setStatus('ready')
        }).catch(() => {
            if (!cancelled) setStatus('error')
        })
        return () => { cancelled = true }
    }, [attempt,])

    function retry() {
        setStatus('loading')
        setAttempt(a => a + 1)
    }

    return { status, retry }
}
