import { LayoutSwitcher } from './components/LayoutSwitcher'
import { Legend } from './components/Legend';
import { NoticeToast } from './components/NoticeToast';
import { PassengerCountSelector } from './components/PassengerCountSelector'
import { PassengerList } from './components/PassengerList'
import { PriceSummary } from './components/PriceSummary';
import { SeatMap } from './components/SeatMap';
import { StickySummaryBar } from './components/StickySummaryBar';


export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Select your seats</h1>
          <p className="text-sm text-slate-500">
            Choose a passenger, then tap a seat to assign it.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          {/* Passenger panel: first in the DOM (mobile order), right column on desktop */}
          <section className="space-y-4 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-6 lg:self-start">
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <PassengerCountSelector />
              <PassengerList />
            </div>
            <PriceSummary />
          </section>

          <section className="space-y-4 lg:col-start-1 lg:row-start-1">
            <LayoutSwitcher />
            <Legend />
            <SeatMap />
          </section>
        </div>
      </div>
      <StickySummaryBar />
      <NoticeToast />
    </div>
  )
}