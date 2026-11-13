import { LAYOUTS } from "./types/layout";
import { flattenSeats, generateSeatRows } from "./utils/seatHelpers";

export default function App() {
  const rows = generateSeatRows(LAYOUTS['2-3-2'])
  console.log(rows[0])
  console.log(flattenSeats(rows).length)
  return (
    <div className="min-h-screen max-w-5xl p-8">
      <h1 className="text-4xl font-bold text-center mx-auto">Flight Seat Selection</h1>

    </div>
  )
}