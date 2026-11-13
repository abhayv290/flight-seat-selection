import { useBooking } from './context/BookingContext'

const btn = 'rounded border border-slate-300 bg-white px-2 py-1 hover:bg-slate-100'

export default function App() {
  const { state, actions } = useBooking()

  return (
    <div className="space-y-4 p-6 font-mono text-sm">
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4].map((n) => (
          <button key={n} className={btn} onClick={() => actions.setPassengerCount(n)}>
            count {n}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {state.passengers.map((p) => (
          <button key={p.id} className={btn} onClick={() => actions.setActivePassenger(p.id)}>
            select {p.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {['1A', '1B', '2A', '8G'].map((id) => (
          <button key={id} className={btn} onClick={() => actions.assignSeat(id)}>
            seat {id}
          </button>
        ))}
        <button className={btn} onClick={() => actions.removeSeat(state.activePassengerId)}>
          remove active seat
        </button>
      </div>

      <div className="flex gap-2">
        <button className={btn} onClick={() => actions.setLayout('3-2')}>layout 3-2</button>
        <button className={btn} onClick={() => actions.setLayout('2-3-2')}>layout 2-3-2</button>
      </div>

      <pre className="rounded bg-slate-900 p-4 text-green-300">
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  )
}