import { getAllProductsWithSpecificClass } from "@/dl/product.data"
import ProductCard from "./ProductCard"

type Props = {
	classSlug: string
}

export default async function RelatedProducts({ classSlug }: Props) {
	const products = await getAllProductsWithSpecificClass(classSlug)

	return (
		<>
			<div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center justify-center gap-8">
				{products?.data.map((product) => (
					<ProductCard product={product} key={product.id} />
				))}
			</div>
		</>
	)
}
