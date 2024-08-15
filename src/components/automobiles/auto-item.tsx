import { Car } from "@/app/lib/definitions";
import Image from "next/image";

export default function AutoItem({ car }: { car: Car }) {
	return (
		<div className="flex w-[480px] h-[186px] border-solid border-[3px] border-dirt-blue">
			<Image
				src={car.image}
				width={240}
				height={180}
				alt="Audi Q7 2024"
			/>
			<div className="pl-[20px] pt-[15px]">
				<h4 className="font-cond text-[20px] font-medium">
					{`${car.make} ${car.model}`}
				</h4>
				<div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-[20px] mb-[20px]">
					<p>{car.fuel}</p>
					<p>{car.power}</p>
					<p>{car.powertrain}</p>
					<p>{car.category}</p>
				</div>
				<p className="font-cond text-[20px] text-orange font-medium">
					${car.price}
				</p>
			</div>
		</div>
	)
}