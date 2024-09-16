"use client"

import { Make, Model } from "@/app/lib/definitions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DefaultButton from "../defualt-button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select from "../select";

export default function SelectCar({
	options,
	isSearch,
	setSelectedCar,
	orderedCarId
}: {
	options: Model[]
	isSearch: boolean
	setSelectedCar?: Dispatch<SetStateAction<Model>>
	orderedCarId?: string | null
}) {
	const [selectedMake, setSelectedMake] = useState<string>("Any make")
	const [selectedModel, setSelectedModel] = useState<string>("Any model")
	const [models, setModels] = useState<string[]>([])

	const chooseMake = selectedMake === "Any make"
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const make = e.target.value
		setSelectedMake(make)
		const filteredModels = options
			.filter((car) => car.make === make)
			.map((car) => car.model)

		// console.log(filteredModels)

		setModels(filteredModels)
		setSelectedModel("Any model")
	}

	const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedModel(e.target.value)
		const car = { make: selectedMake, model: e.target.value, price: 0, carid: "" }
		// console.log(car)
		if (setSelectedCar)
			setSelectedCar(car)
	}

	const handleSearch = () => {
		const params = new URLSearchParams(searchParams)
		if (selectedMake !== "Any make" && selectedModel !== "Any model") {
			// Тут ви можете відправити запит або виконати іншу дію
			params.set("query", selectedModel)
			params.set("page", "1")
			replace(`${pathname}?${params.toString()}`)

			// Наприклад, виклик API або оновлення стану
		} else if (selectedMake !== "Any make") {
			params.set("query", selectedMake)
			params.set("page", "1")
			replace(`${pathname}?${params.toString()}`)

		} else {
			// params.set("page", "1");
			params.set("query", '')
			replace(`${pathname}`)
		}
	}

	const uniqueMakes = Array.from(new Set(options.map((car) => car.make)))
	const orderedCar = options.find((car) => car.carid === orderedCarId)


	const defaultOrderedCar = () => {
		if (setSelectedCar && orderedCar) {
			const car = { make: orderedCar.make, model: orderedCar?.model, price: 0, carid: "" }
			setSelectedCar(car)
		}
	}

	useEffect(() => {
		if (orderedCarId) {
			defaultOrderedCar()
		}
	}, [orderedCarId])


	return (
		<>
			<Select value={selectedMake} name={"make"} options={uniqueMakes} orderedOptions={orderedCar?.make} onChange={handleMakeChange} />
			<Select value={selectedModel} name={"model"} options={models} orderedOptions={orderedCar?.model} onChange={handleModelChange} disabled={chooseMake} />
			{isSearch === true && (
				<DefaultButton type="button" styleType="default" onClickFunction={handleSearch} text={"Search"} />
			)}
		</>
	)
}