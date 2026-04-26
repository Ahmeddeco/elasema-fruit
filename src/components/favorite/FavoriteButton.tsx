"use client"

import { useState, useTransition } from "react"
import { Heart } from "lucide-react"
import { toggleFavorite } from "@/components/favorite/favorite.actions"
import { Button } from "../ui/button"
import { toast } from "sonner"

type FavoriteButtonProps = {
	productId: string
	isFavoritedInitial: boolean
}

export default function FavoriteButton({ productId, isFavoritedInitial }: FavoriteButtonProps) {
	const [isPending, startTransition] = useTransition()
	const [isFavorited, setIsFavorited] = useState(isFavoritedInitial)

	const handleFavorite = () => {
		// تحديث واجهة المستخدم فوراً (Optimistic UI)
		setIsFavorited(!isFavorited)

		startTransition(async () => {
			const result = await toggleFavorite(productId)
			if (!result.success) {
				// إذا فشل الطلب، نعيد الحالة كما كانت
				setIsFavorited(isFavorited)
				toast.error("حدث خطأ ما، حاول مرة أخرى")
			}
		})
	}

	return (
		<Button type="button" onClick={handleFavorite} disabled={isPending} variant={"ghost"} size={"icon"}>
			<Heart fill={isFavorited ? "red" : "none"} color={isFavorited ? "red" : "currentColor"} />
		</Button>
	)
}
