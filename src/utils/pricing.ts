export function formatPrice(amount: number): string {
    return amount === 0 ? 'Free' : amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
}