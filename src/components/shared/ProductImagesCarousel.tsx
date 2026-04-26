"use client"

import Image from "next/image"
import { useState } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

type Props = {
	mainImage: string
	images: string[]
}

export default function ProductImagesCarousel({ images, mainImage }: Props) {
	const allImages = [mainImage, ...images]
	const [image, setImage] = useState(allImages[0])

	return (
		<div className="flex flex-col gap-4 lg:gap-8">
			{/* ----------------------------- mainImage ---------------------------- */}
			<div className="w-full  relative aspect-video">
				<Image src={image} alt={"Product Image"} fill className="object-cover rounded-2xl " />
			</div>

			{/* -------------------------------- images ------------------------------- */}
			<Carousel className=" w-full  min:h-44 h-fit" opts={{ direction: "rtl", align: "center" }}>
				<CarouselContent className="w-full h-fit ">
					{allImages.map((img, index) => (
						<CarouselItem key={index} className="basis-1/3 lg:basis-1/6 ">
							<div className={`relative aspect-video w-full `}>
								<Image
									src={img}
									alt={"product image"}
									fill
									className={`object-cover rounded-lg cursor-pointer ${image === img && "border-2 border-secondary "}`}
									onClick={() => setImage(img)}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
