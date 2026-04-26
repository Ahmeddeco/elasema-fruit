import Link from "next/link"
import { Button } from "../ui/button"
import { ProductFilterType } from "@/types/product.type"

const tabs = [
	{ label: "الكل", value: "all" },
	{ label: "وصل حديثاً", value: "new" },
	{ label: "الأكثر مبيعاً", value: "best" },
	{ label: "العروض", value: "sale" },
]

export default async function FilterTabs({ searchParams }: { searchParams: Promise<{ filter: ProductFilterType }> }) {
	const filter = (await searchParams).filter
	const currentFilter = filter || "all" // إذا لم يوجد فلتر، نعتبره "all"

	return (
		<div className="flex items-center gap-4 ">
			{tabs.map(({ label, value }) => (
				<Button asChild key={value} type="button" variant={currentFilter === value ? "secondary" : "ghost"} size={"sm"}>
					<Link href={`/?filter=${value}`} scroll={false}>
						{label}
					</Link>
				</Button>
			))}
		</div>
	)
}
