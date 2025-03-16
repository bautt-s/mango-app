import HeaderAuth from "@/src/components/header-auth";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Mango • Trackeá tus gastos",
	description: "¡Trackea tus ingresos y gastos históricos con Mango!",
};

const geistSans = Geist({
	display: "swap",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={geistSans.className}>
			<body className="" suppressHydrationWarning>
				<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
					<div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
						<div className="flex gap-5 items-center font-semibold">
							<Link href={"/"}>Mango</Link>
						</div>

						<HeaderAuth />
					</div>
				</nav>

				<div className="">
					{children}
				</div>
			</body>
		</html>
	);
}
