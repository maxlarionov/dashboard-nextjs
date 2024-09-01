
import { Model, TInvoicesTable } from "@/app/lib/definitions";
import { getCurrentInvoices } from "@/app/lib/invoices-routes";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

export default async function InvoicesTable({
	query,
	currentPage,
	invoices,
	cars,
}: {
	query: string;
	currentPage: number;
	invoices: TInvoicesTable[];
	cars: Model[]
}) {

	const test = invoices.map((inv) => {
		return cars.filter((car) => car.carid === inv.carid)
		// return 123
	})

	console.log(`test: ${test}`);



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
				<div key={invoice.id} className="flex bg-black mb-[10px]">
					<div className="grid grid-cols-5 w-[1350px] bg-black pt-[13px] pb-[13px] pl-[20px] pr-[20px] items-center gap-[20px]">
						<p>{invoice.name}</p>
						<>{cars.filter((car) => car.carid === invoice.carid)}</>
						<>{console.log(invoice.carid)}</>
						<p>{formatCurrency(invoice.amount)}</p>
						<p>{formatDateToLocal(invoice.date)}</p>
						{invoice.status === "paid" ? (
							<div className="flex">
								<p className="bg-orange pt-[7px] pb-[7px] pl-[18px] pr-[18px]">Paid</p>
							</div>
						) : (
							<div className="flex">
								<p className="bg-dirt-blue pt-[7px] pb-[7px] pl-[18px] pr-[18px]">Pending</p>
							</div>
						)}
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