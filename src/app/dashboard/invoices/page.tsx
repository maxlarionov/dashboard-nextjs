import { getCarsMakeAndModels } from "@/app/lib/automobiles-routes";
import { getAllInvoicesPages, getCurrentCustomers, getCurrentInvoices } from "@/app/lib/invoices-routes";
import CarOrdering from "@/components/car-ordering";
import InvoicesTable from "@/components/invoices/invoices-table";
import ModalContainer from "@/components/modal-container";
import Pagination from "@/components/pagination";
import Search from "@/components/search";

export default async function Page({
	searchParams
}: {
	searchParams?: {
		query?: string;
		page?: string;
		customer?: string;
		name?: string;
		email?: string;
		city?: string;
		carid?: string;
		amount?: string;
		new?: boolean;
	};
}) {
	const query = searchParams?.query || ""
	const currentPage = Number(searchParams?.page) || 1
	const currentCustomer = searchParams?.customer || ""
	const makeAndModels = await getCarsMakeAndModels()
	const filteredInvoices = await getCurrentInvoices(query, currentPage)
	const allInvoicesPages = await getAllInvoicesPages(query) || 1
	const filteredCustomers = await getCurrentCustomers(currentCustomer)

	// console.log(filteredCustomers)


	return (
		<main className="mt-[14px] max-w-[1504px]">
			<h2 className="font-cond text-[28px] font-medium"
			>
				Invoices
			</h2>
			<div className="flex mt-[20px] justify-between">
				<div className="flex w-full gap-x-[20px]">
					<Search placeholder={"Search invoices..."} />
				</div>
				<ModalContainer modalName={"Car Ordering"} options={makeAndModels} filteredCustomers={filteredCustomers} screen={"second"} />
			</div>
			<div className="p-4 mt-[20px] bg-dirt-blue">
				<InvoicesTable invoices={filteredInvoices} cars={makeAndModels} />
			</div>
			<Pagination allPages={allInvoicesPages} />
		</main>
	)
}