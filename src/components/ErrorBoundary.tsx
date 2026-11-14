import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryState {
    hasError: boolean
}
export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false }
    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Unexpected error', error, info.componentStack)
    }

    render() {
        if (!this.state.hasError) return this.props.children
        return (
            <div role="alert" className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 p-6 text-center">
                <h1 className="text-xl font-bold text-slate-900">Something went wrong</h1>
                <p className="text-sm text-slate-600">An unexpected error occurred. Reloading usually fixes it.</p>
                <button
                    type="button"
                    onClick={() => location.reload()}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    Reload page
                </button>
            </div>
        )
    }


}