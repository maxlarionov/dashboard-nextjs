"use client"

import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import DefaultButton from "./defualt-button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Car, Model } from "@/app/lib/definitions";
import { useEffect } from "react";

export default function CarDescription({
	setIsModalOpen,
	refresh,
	setCurrentScreen,
	options,
	cars
}: {
	setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
	refresh?: boolean
	setCurrentScreen?: React.Dispatch<React.SetStateAction<string>>
	options: Model[]
	cars: Car[] | null | undefined
}) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	useEffect(() => {
		if (refresh === true)
			resetModal()
		console.log('reset');

	}, [refresh])

	const resetModal = () => {
		const params = new URLSearchParams(searchParams)
		params.delete('car')
		params.delete('customer')
		replace(`${pathname}?${params.toString()}`)
		console.log(888);
	}


	if (!cars) { return <p>Error</p> }
	const car = cars.filter((car) => car.carid === searchParams.get('car'))


	const changeScreen = () => {
		if (setCurrentScreen)
			setCurrentScreen("second")
	}
	return (
		<div className="flex mt-[10px] w-[960px]">
			{car && car.length > 0 ? (
				<>
					<Image
						src={car[0].image}
						width={480}
						height={355}
						alt="Audi Q7 2024"
					/>
					<div className="flex ml-[60px] h-100% flex-col justify-between">
						<div>
							<h4 className="font-cond text-[20px] font-medium">
								{`${car[0].make} ${car[0].model}`}
							</h4>
							<p className="font-cond text-[20px] text-orange font-medium mt-[15px]">
								{`$${car[0].price}`}
							</p>
						</div>
						<div className="grid grid-cols-2 gap-y-2.5 mt-[15px] mb-[15px]">
							<p className="font-medium">Fuel</p>
							<p>{`${car[0].fuel}`}</p>
							<p className="font-medium">Power</p>
							<p>{`${car[0].power}`}</p>
							<p className="font-medium">Powertrain</p>
							<p>{`${car[0].powertrain}`}</p>
							<p className="font-medium">Category</p>
							<p>{`${car[0].category}`}</p>
						</div>
						<p>
							{`${car[0].description}`}
						</p>
						<div className="flex justify-between">
							<DefaultButton type={"button"} styleType={"default"} text={"Order"} onClickFunction={changeScreen} />
						</div>
					</div>
				</>
			) : (
				<p>Render Error</p>
			)}
		</div>
	)
}