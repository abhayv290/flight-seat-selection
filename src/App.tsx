import { LayoutSwitcher } from "./components/LayoutSwitcher";
import { Legend } from "./components/Legend";
import { SeatMap } from "./components/SeatMap";


export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-xl space-y-5">
        <h1 className="text-2xl font-bold text-slate-900">Select your seats</h1>
        <LayoutSwitcher />
        <Legend />
        <SeatMap />
      </div>
    </div>
  )
}