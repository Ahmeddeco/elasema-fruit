"use client"

import { useCartStore } from "@/store/cartStore"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetFooter,
	SheetDescription,
} from "@/components/ui/sheet"
import { Minus, Plus, ShoppingCart, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Currency } from "@/helpers/currency"
import { CheckOutButton } from "@/components/shared/CustomButtons"
import { priceInfo, totalPrice } from "@/helpers/price.logic"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Badge } from "@/components/ui/badge"

type Props = {
	tax?: number
}

export default function Cart({ tax = 10 }: Props) {
	const { items, removeFromCart, updateQuantity } = useCartStore((state) => state)
	const { subTotal, taxValue, total } = priceInfo(items, tax)

	return (
		<Sheet>
			<SheetTrigger>
				<div className="relative">
					<ShoppingCart />
					<div className="rounded-full bg-primary size-6 absolute -bottom-2 -right-4 flex items-center justify-center">
						<span className="text-sm font-medium flex items-center justify-center text-neutral-200">
							{items.length}
						</span>
					</div>
				</div>
			</SheetTrigger>

			<SheetContent showCloseButton className="w-[90%] overscroll-none">
				<SheetHeader className="h-[5vh] ">
					<SheetTitle className="flex items-center justify-center gap-2 ">
						<ShoppingCart className="text-primary dark:text-secondary" /> سلة المشتريات
					</SheetTitle>
					<SheetDescription className="text-center">راجع المنتجات المضافة إلى سلتك قبل إتمام الشراء</SheetDescription>
				</SheetHeader>

				<ScrollArea dir="rtl" className="flex flex-col gap-4 p-4 w-full h-full max-h-[50vh] ">
					{items.map(({ id, image, price, quantity, title }) => (
						<Item variant="outline" key={id} className="mb-4">
							<ItemMedia variant="image" className=" relative size-20">
								<Image src={image} alt={title} fill className="rounded-md object-cover" />
							</ItemMedia>
							<ItemContent>
								<ItemTitle className="line-clamp-1">{title}</ItemTitle>
								<ItemDescription>{totalPrice(price, quantity)} ج.م</ItemDescription>
								{/* -------------------------------- quantity -------------------------------- */}
								<div className=" flex items-center justify-start gap-2 ">
									<Button
										variant={"outline"}
										size={"icon-xs"}
										type="button"
										onClick={() => {
											updateQuantity("decrement", id)
										}}
									>
										<Minus />
									</Button>
									<Button size={"icon-xs"} type="button" className="cursor-not-allowed">
										{quantity}
									</Button>
									<Button
										variant={"outline"}
										size={"icon-xs"}
										type="button"
										onClick={() => {
											updateQuantity("increment", id)
										}}
									>
										<Plus />
									</Button>
								</div>
								<ItemDescription></ItemDescription>
							</ItemContent>
							<ItemActions className="self-start">
								<Button size={"icon-sm"} type="button" className="rounded-full" onClick={() => removeFromCart(id)}>
									<X />
								</Button>
							</ItemActions>
						</Item>
					))}
				</ScrollArea>
				<SheetFooter className="h-fit ">
					<Card className="h-full">
						<CardContent className="flex flex-col gap-4 h-full">
							<div className="flex items-center justify-between">
								<h5>المجموع</h5>
								<Badge variant={"outline"}>{Currency(subTotal)}</Badge>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<h5>الضريبة</h5>
								<Badge variant={"outline"}>{Currency(taxValue)}</Badge>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<h5>الإجمالي</h5>
								<Badge variant={"default"}>{Currency(total)}</Badge>
							</div>
							<CheckOutButton />
						</CardContent>
					</Card>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
