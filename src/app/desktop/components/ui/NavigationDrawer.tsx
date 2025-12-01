'use client'

import Link from "next/link"

export const NavigationDrawer = () => {
    return (
        <div className="flex flex-col bg-stone-900 rounded-full px-2 py-4 gap-y-2 w-20 h-fit">
            <Link
                aria-label="dashboard-button"
                className="bg-stone-700 rounded-full h-16 w-16 p-2 group"
                href='/desktop/user/dashboard'
            >
                <img
                    aria-label="dashboard-icon"
                    src='/shared/icons/dashboard-icon.png'
                    className="group-hover:scale-110 transition-transform duration-300 rounded-full"
                    width={64}
                    height={64}
                />
            </Link>

            <Link
                aria-label="stats-button"
                className="bg-stone-700 rounded-full h-16 w-16 p-2 group"
                href='/desktop/user/stats'
            >
                <img
                    aria-label="stats-icon"
                    src='/shared/icons/stats-icon.png'
                    className="group-hover:scale-110 transition-transform duration-300"
                    width={64}
                    height={64}
                />
            </Link>

            <Link
                aria-label="history-button"
                className="bg-stone-700 rounded-full h-16 w-16 p-2 group"
                href='/desktop/user/history'
            >
                <img
                    aria-label="history-icon"
                    src='/shared/icons/history-icon.png'
                    className="group-hover:scale-110 transition-transform duration-300"
                    width={64}
                    height={64}
                />
            </Link>

            <Link
                aria-label="savings-button"
                className="bg-stone-700 rounded-full h-16 w-16 p-2 group"
                href='/desktop/user/savings'
            >
                <img
                    aria-label="savings-icon"
                    src='/shared/icons/savings-icon.png'
                    className="group-hover:scale-110 transition-transform duration-300"
                    width={64}
                    height={64}
                />
            </Link>

            <Link
                aria-label="cycles-button"
                className="bg-stone-700 rounded-full h-16 w-16 p-2 group"
                href='/desktop/user/cycles'
            >
                <img
                    aria-label="cycles-icon"
                    src='/shared/icons/cycles-icon.png'
                    className="group-hover:scale-110 transition-transform duration-300 rounded-full"
                    width={64}
                    height={64}
                />
            </Link>

            <Link
                aria-label="milestone-button"
                className="bg-stone-700 rounded-full h-16 w-16 p-2 group"
                href='/desktop/user/milestones'
            >
                <img
                    aria-label="milestone-icon"
                    src='/shared/icons/milestone-icon.png'
                    className="group-hover:scale-110 transition-transform duration-300"
                    width={64}
                    height={64}
                />
            </Link>
        </div>
    )
}