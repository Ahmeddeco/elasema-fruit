import Footer from "@/components/layout/Footer"
import { ServerSidebar } from "@/components/layout/ServerSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { CircleAlert, CircleCheckBig, CircleX } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<ServerSidebar />
			<div className="w-full  ">
				<SidebarTrigger />
				<main className="p-4 lg:p-8 min-h-[80vh]">
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
			</div>
		</SidebarProvider>
	)
}
