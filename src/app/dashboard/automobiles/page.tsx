import AutoItem from "@/components/automobiles/auto-item";
import ModalContainer from "@/components/modal-container";
import CarOrdering from "@/components/car-ordering";
import SelectCar from "@/components/automobiles/select-car";
import { getAllCarsPages, getCarsMakeAndModels, getCurrentCars } from "@/app/lib/automobiles-routes";
import Pagination from "@/components/pagination";
import { getCurrentCustomers } from "@/app/lib/invoices-routes";
import CarDescription from "@/components/car-description";

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
		customer?: string;
	};
}) {
	const query = searchParams?.query || ""
	const currentPage = Number(searchParams?.page) || 1
	const currentCustomer = searchParams?.customer || ""
	const makeAndModels = await getCarsMakeAndModels()
	const filteredCars = await getCurrentCars(query, currentPage)
	const allCarsPages = await getAllCarsPages(query) || 1
	const filteredCustomers = await getCurrentCustomers(currentCustomer)

	console.log(makeAndModels)


	return (
		<main className="mt-[14px] max-w-[1504px]">
			<h2 className="font-cond text-[28px] font-medium"
			>
				Automobiles
			</h2>
			<div className="flex mt-[20px] justify-between">
				<div className="flex w-full gap-x-[20px]">
					<SelectCar options={makeAndModels} isSearch={true} />
				</div>
				<ModalContainer modalName={"Car Ordering"} options={makeAndModels} filteredCustomers={filteredCustomers} screen={"first"} />
				{/* <ModalContainer modalName={"Car Desctiption"}>
					<CarDescription />
					<CarOrdering options={makeAndModels} filteredCustomers={filteredCustomers} />
				</ModalContainer> */}
			</div>
			<div className="mt-5 grid grid-cols-3 gap-[20px] xl:grid-cols-2 2xl:grid-cols-3">
				{filteredCars?.map((car) => (
					<AutoItem key={car.carid} car={car} />
				))}
			</div>
			<Pagination allPages={allCarsPages} />
		</main>
	)
}