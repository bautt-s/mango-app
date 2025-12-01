'use client'

import { FiBell } from "react-icons/fi"

export const NotificationsButton = () => {
    return (
        <button
            onClick={() => console.log('a')}
            aria-label="home button"
            className="flex flex-row items-center gap-x-3 bg-white size-12 rounded-full group"
        >
            <FiBell className="text-xl mx-auto group-hover:scale-110 transition-transform duration-300" />
        </button>
    )
}