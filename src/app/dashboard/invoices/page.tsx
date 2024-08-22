import { getCarsMakeAndModels } from "@/app/lib/automobiles-routes";
import { getAllInvoicesPages, getCurrentInvoices } from "@/app/lib/invoices-routes";
import CarOrdering from "@/components/car-ordering";
import Input from "@/components/input";
import InvoicesTable from "@/components/invoices/invoices-table";
import ModalContainer from "@/components/modal-container";
import Pagination from "@/components/pagination";

export default async function Page({
	searchParams
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	const query = searchParams?.query || ""
	const currentPage = Number(searchParams?.page) || 1
	const makeAndModels = await getCarsMakeAndModels()
	const filteredInvoices = await getCurrentInvoices(query, currentPage)
	const allInvoicesPages = await getAllInvoicesPages(query) || 1

	return (
		<main className="mt-[14px] max-w-[1504px]">
			<h2 className="font-cond text-[28px] font-medium"
			>
				Invoices
			</h2>
			<div className="flex mt-[20px] justify-between">
				<div className="flex w-full gap-x-[20px]">
					<Input />
				</div>
				<ModalContainer modalName={"Car Ordering"} options={makeAndModels}>
					<CarOrdering options={makeAndModels} />
				</ModalContainer>
			</div>
			<div className="p-4 mt-[20px] bg-dirt-blue">
				<InvoicesTable query={query} currentPage={1} invoices={filteredInvoices} />
			</div>
			<Pagination allPages={allInvoicesPages} />
		</main>
	)
}