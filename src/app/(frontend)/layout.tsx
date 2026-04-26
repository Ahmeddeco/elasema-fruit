import Footer from "@/components/layout/Footer"
import NavBar from "@/components/layout/NavBar"
import { Toaster } from "@/components/ui/sonner"
import { CircleAlert, CircleCheckBig, CircleX } from "lucide-react"

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NavBar />
			<main className="min-h-dvh flex flex-col items-center justify-center gap-8 lg:gap-12 xl:gap-16">
				{children}
				<Toaster
					theme="system"
					richColors
					duration={5000}
					style={{ position: "fixed" }}
					icons={{
						success: <CircleCheckBig />,
						warning: <CircleAlert />,
						error: <CircleX />,
					}}
				/>
			</main>
			<Footer />
		</>
	)
}
