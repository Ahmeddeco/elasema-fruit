"use client"

import { SidebarMenu } from "../ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "../ui/button"
import React from "react"
import { adminNav } from "@/constants/adminNav"

export default function ServerNavigation() {
	const pathName = usePathname()

	return (
		<SidebarMenu>
			{adminNav.map(({ href, title, icon }) => (
				<SidebarMenu key={href}>
					<Button asChild variant={pathName === href ? "default" : "ghost"} size={"full"} className="justify-start">
						<Link href={href}>
							{React.createElement(icon)}
							{title}
						</Link>
					</Button>
				</SidebarMenu>
			))}
		</SidebarMenu>
	)
}
