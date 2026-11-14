import type { Meal } from '../types'

export const MEALS: Meal[] = [
    { id: 'snack', name: 'Light Snack', description: 'Biscuits and a drink', price: 0, isVegetarian: true },
    { id: 'veg-thali', name: 'Veg Thali', description: 'Dal, paneer, rice, roti and sweet', price: 299, isVegetarian: true },
    { id: 'chicken-biryani', name: 'Chicken Biryani', description: 'With raita and dessert', price: 349, isVegetarian: false },
    { id: 'sandwich', name: 'Club Sandwich', description: 'Grilled, with fries', price: 199, isVegetarian: false },
    { id: 'fruit-bowl', name: 'Fresh Fruit Bowl', description: 'Seasonal fruit and yogurt', price: 149, isVegetarian: true },
]

export const MEAL_LOOKUP = new Map(MEALS.map((meal) => [meal.id, meal]))