import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
	return (
		<div className="h-dvh flex flex-col items-center justify-center gap-4 ">
			<h2>الصفحة غير موجودة</h2>
			<h6>يمكنك الضغط على الزر للرجوع الى الصفحة الرئيسية</h6>
			<Button asChild variant={"default"}>
				<Link href="/">
					<Home />
					الصفحة الرئيسية
				</Link>
			</Button>
		</div>
	)
}
