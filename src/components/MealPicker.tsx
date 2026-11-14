import { useBooking } from "../context/BookingContext";
import { MEALS } from "../data/meals";
import { formatPrice } from "../utils/pricing";

export function MealPicker() {
    const { state, actions } = useBooking()
    const index = state.passengers.findIndex(p => p.id === state.activePassengerId)
    const passenger = state.passengers[index]

    return (
        <section aria-labelledby="meal-title"
            className="space-y-3 rounded-2xl border- border-slate-300 bg-white p-4 shadow-sm">
            <div>
                <h2 className="text-sm fond-semibold text-slate-900">
                    Meal for {passenger.name}
                </h2>
                <p className="text-xs text-slate-500">Optional. Pick one , tap it again to remove</p>
            </div>
            <ul className="space-y-2">
                {MEALS.map(meal => {
                    const isSelected = passenger.mealId === meal.id
                    return <li key={meal.id} className="">
                        <button type="button" aria-pressed={isSelected}
                            onClick={() => actions.setMeal(passenger.id, isSelected ? null : meal.id)}
                            className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isSelected ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'} `}>
                            <span aria-label={meal.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'} className={`mt-1 flex h-4 w-4 shrink-0  items-center   justify-center rounded-sm border-2 ${meal.isVegetarian ? 'border-green-500' : 'border-red-500'}`}>
                                <span className={`h-2 w-2 rounded-full ${meal.isVegetarian ? 'bg-green-500' : 'bg-red-500'}`} />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block text-sm font-medium text-slate-800">{meal.name}</span>
                                <span className="block text-xs text-slate-500">{meal.description}</span>
                            </span>
                            <span className="text-sm font-semibold text-slate-700">
                                {formatPrice(meal.price)}
                            </span>
                        </button>
                    </li>
                })}
            </ul>
        </section>
    )
}