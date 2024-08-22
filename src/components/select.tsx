import { Make, Model } from "@/app/lib/definitions";

export default function Select({
	name,
	options
}: {
	name: string;
	options: Model[]
}) {
	return (
		<select
			id={name}
			name={name}
			className="h-[37px] w-[170px] border-[3px] border-dirt-blue bg-black py-0 pl-2 text-gray-500"
		>
			<option>Any {name}</option>
			{options.map((option, index) => (
				<option key={(index + 1) + "_car"}>{option.make}</option>
			))}
		</select>
	)
}