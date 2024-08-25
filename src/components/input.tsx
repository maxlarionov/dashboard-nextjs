import { Dispatch, SetStateAction } from "react"

export default function Input({
	placeholder,
	value,
	onChange
}: {
	placeholder: string
	value: string
	onChange: Dispatch<SetStateAction<string>>
}) {
	return (
		<input
			value={value}
			onChange={(e) => onChange(e.target.value)}
			id="search"
			name="search"
			type="text"
			placeholder={placeholder}
			className="block w-[300px] border-[3px] border-dirt-blue py-1.5 pl-2.5 bg-black pr-20 text-gray-900 placeholder:text-gray-400"
		/>
	)
}