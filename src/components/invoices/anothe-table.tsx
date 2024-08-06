import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

export default function AnotherTable() {
	const invoices = [1, 2, 3, 4]

	return (
		<div>
			<div className="flex">
				<div className="grid grid-cols-5 w-[1350px] pt-[13px] pb-[13px] pl-[20px] pr-[20px] items-center gap-[20px]">
					<p>Customer</p>
					<p>Car</p>
					<p>Amount</p>
					<p>Date</p>
					<p>Paid</p>
				</div>
			</div>
			{invoices?.map((invoice) => (
				<div className="flex bg-black mb-[10px]">
					<div className="grid grid-cols-5 w-[1350px] bg-black pt-[13px] pb-[13px] pl-[20px] pr-[20px] items-center gap-[20px]">
						<p>Freida Fujita</p>
						<p>Audi Q7</p>
						<p>$103 000</p>
						<p>Oct 4, 2023</p>
						<div className="flex">
							<p className="bg-orange pt-[7px] pb-[7px] pl-[18px] pr-[18px]">Paid</p>
						</div>
					</div>
					<div className="flex m-[13px] gap-[20px]">
						<div className="p-[5px] bg-yellow">
							<PencilSquareIcon className="w-[24px] text-black" />
						</div>
						<div className="p-[5px] bg-light-red">
							<TrashIcon className="w-[24px]" />
						</div>
					</div>
				</div>
			))}
		</div>
	)
}