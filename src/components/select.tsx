import { Make, Model } from "@/app/lib/definitions";

export default function Select({
	value,
	name,
	options,
	onChange,
	disabled,
}: {
	value: string
	name: string;
	options: string[]
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	disabled?: boolean
}) {


	return (
		<select
			value={value}
			id={name}
			name={name}
			disabled={disabled}
			onChange={(e) => onChange(e)}
			className="h-[37px] w-[170px] border-[3px] border-dirt-blue bg-black py-0 pl-2 text-gray-500"
		>
			<option>Any {name}</option>
			{options.map((option, index) => (
				<option key={(index + 1) + "_" + name}>{option}</option>
			))}
		</select>
	)
}