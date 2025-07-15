export function Input({ className = "", ...props}) {
    return (
        <input
                className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-greeb border ${className}`}
                {...props}
        />
    )
}