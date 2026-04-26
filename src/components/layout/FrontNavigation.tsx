"use client"

import { frontNav } from "@/constants/frontNav"
import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function FrontNavigation() {
	const pathName = usePathname()

	return (
		<>
			{frontNav.map(({ href, title }) => (
				<Button asChild key={href} variant={pathName === href ? "default" : "ghost"} size={"sm"}>
					<Link href={href}>{title}</Link>
				</Button>
			))}
		</>
	)
}
