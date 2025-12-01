import Link from "next/link"
import { NavigationDrawer, NotificationsButton } from "../components/ui"
import { FiSettings } from "react-icons/fi"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex flex-row h-screen w-screen py-6 px-4 bg-apricot-d2/20">
            <div className="flex flex-col w-20 h-full justify-center">
                <NavigationDrawer />
            </div>

            <div className="flex flex-col w-full h-full">
                <div className="flex flex-row gap-x-2 w-fit ml-auto">
                    <Link
                        href='/desktop/settings'
                        aria-label="home button"
                        className="flex flex-row items-center gap-x-3 bg-white size-12 rounded-full group"
                    >
                        <FiSettings className="text-xl mx-auto group-hover:scale-110 transition-transform duration-300" />
                    </Link>

                    <NotificationsButton />
                </div>

                <div className="w-full h-full px-4">
                    {children}
                </div>
            </div>
        </main>
    )
}