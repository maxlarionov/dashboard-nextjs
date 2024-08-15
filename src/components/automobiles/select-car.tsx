"use client"

import { Make, Model } from "@/app/lib/definitions";
import Select from "@/components/select";
import { useState } from "react";

export default function SelectCar({
	name,
	options
}: {
	name: string;
	options: Model[]
}) {
	const [selectedMake, setSelectedMake] = useState<string>("Any Make")
	const [selectedModel, setSelectedModel] = useState<string>("Any Model")
	const [models, setModels] = useState<string[]>([])

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
		if (selectedMake !== "Any Make" && selectedModel !== "Any Model") {
			// Тут ви можете відправити запит або виконати іншу дію
			console.log(`Searching for ${selectedMake} ${selectedModel}`)
			// Наприклад, виклик API або оновлення стану
		} else if (selectedMake !== "Any Make") {
			console.log(`Searching for ${selectedMake}`)
		} else {
			console.log('Please select make')
		}
	}

	const uniqueMakes = Array.from(new Set(options.map((car) => car.make)));

	return (
		<>
			<select
				value={selectedMake}
				onChange={(e) => handleMakeChange(e)}
				id={name}
				name={name}
				className="h-[37px] w-[170px] border-[3px] border-dirt-blue bg-black py-0 pl-2 text-gray-500"
			>
				<option>Any {name}</option>
				{uniqueMakes.map((make) => (
					<option key={make} value={make}>{make}</option>
				))}
			</select>

			<select
				value={selectedModel}
				onChange={handleModelChange}
				disabled={selectedMake === "Any Make"}
				id={name}
				name={name}
				className="h-[37px] w-[170px] border-[3px] border-dirt-blue bg-black py-0 pl-2 text-gray-500"
			>
				<option>Any Model</option>
				{models.map((model) => (
					<option key={model} value={model}>{model}</option>
				))}
			</select>
			<button onClick={handleSearch} disabled={!selectedMake || !selectedModel}>
				Search
			</button>

		</>
	)
}