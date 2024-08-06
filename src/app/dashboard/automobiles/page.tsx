import AutoItem from "@/components/automobiles/auto-item";
import DefaultButton from "@/components/defualt-button";
import Input from "@/components/input";
import Modal from "@/components/modal";
import Modal2 from "@/components/modal2";
import Select from "@/components/select";

export default function Page() {
	return (
		<main className="mt-[14px] max-w-[1504px]">
			<h2 className="font-cond text-[28px] font-medium"
			>
				Automobiles
			</h2>
			<div className="flex mt-[20px] justify-between">
				<div className="flex w-full gap-x-[20px]">
					<Input />
					<Select />
					<Select />
					<DefaultButton />
				</div>
				<DefaultButton />
			</div>
			<div className="mt-5 grid grid-cols-3 gap-[20px] xl:grid-cols-2 2xl:grid-cols-3">
				<AutoItem />
				<AutoItem />
				<AutoItem />
				<AutoItem />
				<AutoItem />
				<AutoItem />
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