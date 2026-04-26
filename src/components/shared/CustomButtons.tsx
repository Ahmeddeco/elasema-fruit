"use client"

import { useFormStatus } from "react-dom"
import { Button, buttonVariants } from "../ui/button"
import { Eye, Loader2, LogIn, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { VariantProps } from "class-variance-authority"
import Link from "next/link"
import { ProductCartType } from "@/types/product.type"
import { signIn, useSession } from "@/lib/auth-client"

type SubmitButtonType = {
	title: string
	type?: "button" | "submit" | "reset" | undefined
	size?: "default" | "sm" | "lg" | "full" | "icon" | null | undefined
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

/* ------------------------------ ShopNowButton ----------------------------- */
export function ShopNowButton({
	id,
	variant,
}: {
	id?: string
	variant?: VariantProps<typeof buttonVariants>["variant"]
}) {
	return (
		<Button asChild variant={variant || "secondary"} size="lg">
			<Link href={id ? `/shop/${id}` : `/shop`}>
				<ShoppingCart />
				إشتري الآن
			</Link>
		</Button>
	)
}

/* --------------------------- ShopByQueryButton ---------------------------- */
export function ShopByQueryButton({
	query,
	variant,
}: {
	query: string
	variant?: VariantProps<typeof buttonVariants>["variant"]
}) {
	return (
		<Button asChild variant={variant || "secondary"} size="sm">
			<Link href={`/shop/query?${query}`}>
				<ShoppingCart />
				إشتري الآن
			</Link>
		</Button>
	)
}

/* ------------------------------ SubmitButton ------------------------------ */

export function SubmitButton({ title, type = "submit", size = "full", variant }: SubmitButtonType) {
	const { pending } = useFormStatus()

	return (
		<>
			{pending ? (
				<Button disabled variant={variant} size={size}>
					<Loader2 className="size-4 animate-spin" />
					please wait
				</Button>
			) : (
				<Button type={type} size={size} variant={variant}>
					{title}
				</Button>
			)}
		</>
	)
}

/* -------------------------------- AddToCart ------------------------------- */

export function AddToCart({ product }: { product: ProductCartType }) {
	const session = useSession()
	const handleSignIn = async () => {
		await signIn.social({
			provider: "google",
		})
	}

	const { pending } = useFormStatus()
	const addToCart = useCartStore((state) => state.addToCart)

	return !session.data?.user ? (
		<Button type="button" size={"full"} onClick={handleSignIn}>
			<LogIn /> سجل دخولك أولا للإضافة الى السلة
		</Button>
	) : (
		<>
			{pending ? (
				<Button size={"full"} disabled>
					<Loader2 className="size-5 animate-spin" /> please wait
				</Button>
			) : (
				<Button size={"full"} type="button" onClick={() => addToCart(product)}>
					<ShoppingCart className="size-5" /> أضف الى العربة
				</Button>
			)}
		</>
	)
}

/* ---------------------------- SeeProductButton ---------------------------- */

export const SeeProductButton = ({ id }: { id: string }) => {
	return (
		<Button asChild size={"full"} variant={"outline"}>
			<Link href={`/shop/${id}`}>
				<Eye /> شاهد تفاصيل المنتج
			</Link>
		</Button>
	)
}
/* ----------------------------- CheckOutButton ----------------------------- */
// TODO Add a checkout method with payment service like paymob or kashir
export const CheckOutButton = () => {
	const { pending } = useFormStatus()
	return (
		<>
			{pending ? (
				<Button disabled>
					<Loader2 className="size-5 animate-spin" /> please wait
				</Button>
			) : (
				<Button size={"full"} type="button" onClick={() => console.log("CheckOut Button pressed!")}>
					الدفع وإكمال عملية الشراء <ShoppingCart />
				</Button>
			)}
		</>
	)
}

/* ---------------------------- deleteItemButton ---------------------------- */

export function DeleteItemButton() {
	const { pending } = useFormStatus()
	return (
		<>
			{pending ? (
				<Button disabled size={"sm"} variant={"destructive"}>
					<Loader2 className="size-5 animate-spin" /> removing ...
				</Button>
			) : (
				<Button type="submit" size={"sm"} variant={"destructive"}>
					delete
				</Button>
			)}
		</>
	)
}
