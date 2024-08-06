import AutoItem from "@/components/automobiles/auto-item";
import DefaultButton from "@/components/defualt-button";
import Input from "@/components/input";
import AnotherTable from "@/components/invoices/anothe-table";
import Table from "@/components/invoices/table";
import Modal from "@/components/modal";
import Modal2 from "@/components/modal2";
import Select from "@/components/select";
import { DeviceTabletIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Page() {
	const invoices = [1, 2, 3, 4, 5]

	return (
		<main className="mt-[14px] max-w-[1504px]">
			<h2 className="font-cond text-[28px] font-medium"
			>
				Invoices
			</h2>
			<div className="flex mt-[20px] justify-between">
				<div className="flex w-full gap-x-[20px]">
					<Input />
					<DefaultButton />
				</div>
				<DefaultButton />
			</div>
			<div className="p-4 mt-[20px] bg-dirt-blue">
				{/* <Table /> */}
				<AnotherTable />
			</div>

			<div className="flex gap-[20px] justify-center mt-[30px]">
				<div className="flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue">
					<p>{'<'}</p>
				</div>
				<div className="flex gap-2.5">
					<div className="flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue">
						<p>1</p>
					</div>
					<div className="flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue">
						<p>2</p>
					</div>
					<div className="flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue">
						<p>3</p>
					</div>
				</div>
				<div className="flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue">
					<p>{'>'}</p>
				</div>
			</div>
			{/* <div>
				<Modal />
			</div>
			<div>
				<Modal2 />
			</div> */}
		</main>
	)
}