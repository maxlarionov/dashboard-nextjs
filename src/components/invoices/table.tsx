import { TrashIcon } from "@heroicons/react/24/outline"

export default function Table() {
	return (
		<table className="w-full">
			<thead className="text-left">
				<th className="pt-[15px] pl-[20px]">Customer</th>
				<th>Car</th>
				<th>Amount</th>
				<th>Date</th>
				<th className="pb-[20px] pr-[20px]">Status</th>
			</thead>
			<tbody>
				<tr className="relative bg-black border-solid border-[4px] border-dirt-blue">
					<td className="pt-[20px] pl-[20px]">Freida Fujita</td>
					<td>AUDI Q7 2024</td>
					<td>$103 000</td>
					<td>Oct. 4, 2024</td>
					<td>
						<button className="flex text-orange mb-[20px]">Paid</button>
					</td>
					<td className="absolute right-[30px] top-[12px]">
						<TrashIcon className="w-[24px] text-light-red" />
					</td>
				</tr>
				<tr className="relative bg-black border-solid border-[4px] border-dirt-blue">
					<td className="">
						<p className="pt-[20px] pl-[20px]">
							Freida Fujita
						</p>
					</td>
					<td>AUDI Q7 2024</td>
					<td>$103 000</td>
					<td>Oct. 4, 2024</td>
					<td className="">
						<p className="pb-[20px]">Panding</p>
					</td>
					<td className="absolute right-[30px] top-[12px]">
						<TrashIcon className="w-[24px] text-light-red" />
					</td>
				</tr>
			</tbody>
		</table>
	)
}