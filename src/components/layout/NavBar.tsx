import UserButton from "@/auth/UserButton"
import Logo from "./Logo"
import MobileMenu from "./MobileMenu"
import { ThemeButton } from "../theme/ThemeButton"
import FrontNavigation from "./FrontNavigation"
import Cart from "@/store/Cart"
import { getSession } from "@/auth/getSession"

export default async function NavBar() {
	const session = await getSession()
	return (
		<header className="fixed w-full inset-0 mx-auto bg-foreground/80 border drop-shadow-xl text-background backdrop-blur-2xl lg:rounded-full rounded-none px-4 h-14 z-50 container lg:mt-4 mt-0 flex items-center justify-between ">
			{/* --------------------------------- Logo -------------------------------- */}
			<Logo />

			{/* ---------------------------- DesktopNav ---------------------------- */}
			<nav className="hidden lg:flex items-center gap-4">
				<FrontNavigation />
			</nav>
			<nav className="lg:hidden flex items-center justify-center gap-4">
				{session && <Cart />}
				<MobileMenu />
			</nav>
			{/* ------------------------------ Socials ----------------------------- */}
			<div className="lg:flex hidden items-center gap-4">
				<ThemeButton />
				{session && <Cart />}
				<UserButton />
			</div>
		</header>
	)
}
