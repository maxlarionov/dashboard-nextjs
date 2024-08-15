"use client"

import { Make, Model } from "@/app/lib/definitions";
import Select from "@/components/select";
import { useState } from "react";
import DefaultButton from "../defualt-button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SelectCar({
	options,
}: {
	options: Model[]
}) {
	const [selectedMake, setSelectedMake] = useState<string>("Any Make")
	const [selectedModel, setSelectedModel] = useState<string>("Any Model")
	const [models, setModels] = useState<string[]>([])
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const make = e.target.value
		setSelectedMake(make)
		const filteredModels = options
			.filter((car) => car.make === make)
			.map((car) => car.model)

		console.log(filteredModels)

		setModels(filteredModels)
		setSelectedModel("Any Model")
	}

	const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedModel(e.target.value);
	}

	const handleSearch = () => {
		const params = new URLSearchParams(searchParams)
		if (selectedMake !== "Any Make" && selectedModel !== "Any Model") {
			// Тут ви можете відправити запит або виконати іншу дію
			params.set("query", selectedModel)
			replace(`${pathname}?${params.toString()}`)

			console.log(`Searching for ${selectedMake} ${selectedModel}`)
			// Наприклад, виклик API або оновлення стану
		} else if (selectedMake !== "Any Make") {
			params.set("query", selectedMake)
			replace(`${pathname}?${params.toString()}`)

			console.log(`Searching for ${selectedMake}`)
		} else {
			// params.set("page", "1");
			params.set("query", '')
			replace(`${pathname}`)
			console.log('Please select make')
		}
	}

	const uniqueMakes = Array.from(new Set(options.map((car) => car.make)));

	return (
		<>
			<select
				value={selectedMake}
				onChange={(e) => handleMakeChange(e)}
				name="make"
				className="h-[37px] w-[170px] border-[3px] border-dirt-blue bg-black py-0 pl-2 text-gray-500"
			>
				<option>Any Make</option>
				{uniqueMakes.map((make) => (
					<option key={make} value={make}>{make}</option>
				))}
			</select>

			<select
				value={selectedModel}
				onChange={handleModelChange}
				disabled={selectedMake === "Any Make"}
				name="model"
				className="h-[37px] w-[170px] border-[3px] border-dirt-blue bg-black py-0 pl-2 text-gray-500"
			>
				<option>Any Model</option>
				{models.map((model) => (
					<option key={model} value={model}>{model}</option>
				))}
			</select>
			<DefaultButton type="button" styleType="default" onClickFunction={handleSearch} text={"Search"} />
		</>
	)
}