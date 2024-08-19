import DefaultButton from "@/components/defualt-button";
import Input from "@/components/input";

export default function Page() {
	return (
		<main className="mt-[14px] max-w-[560px]">
			<h2 className="font-cond text-[28px] font-medium"
			>
				Car Additing
			</h2>
			<div className="mt-[20px] mb-[20px]">
				<div className="grid grid-flow-row-dense grid-cols-3 grid-rows-auto items-center gap-y-[10px]">
					<p className="text-[20px] font-medium">
						Make
					</p>
					<div className="col-span-2">
						<Input />
					</div>
					<p className="text-[20px] font-medium">
						Model
					</p>
					<div className="col-span-2">
						<Input />
					</div>
					<p className="text-[20px] font-medium">
						Fuel
					</p>
					<div className="col-span-2">
						<Input />
					</div>
					<p className="text-[20px] font-medium">
						Power
					</p>
					<div className="col-span-2">
						<Input />
					</div>
					<p className="text-[20px] font-medium">
						Powertrain
					</p>
					<div className="col-span-2">
						<Input />
					</div>
					<p className="text-[20px] font-medium">
						Category
					</p>
					<div className="col-span-2">
						<Input />
					</div>
					<p className="text-[20px] font-medium">
						Description
					</p>
					<div className="col-span-2">
						<Input />
						<Input />
						<Input />
					</div>
					<p className="text-[20px] font-medium">
						Price
					</p>
					<div className="col-span-2">
						<Input />
					</div>
					<p className="text-[20px] font-medium">
						Image
					</p>
					<div className="col-span-2">
						<Input />
					</div>
				</div>
			</div>
			<div className="flex justify-end">
				{/* <DefaultButton />
				<DefaultButton /> */}
			</div>
		</main>
	)
}