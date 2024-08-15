
import DefaultButton from "./defualt-button";
import Select from "./select";
import Input from "./input";
import { Make, Model } from "@/app/lib/definitions";
import SubmitButton from "./submit-button";

export default function CarOrdering({
	options
}: {
	options: Model[]
}) {


	return (
		<div className="mt-[20px]">
			<div>
				<p className="font-cond text-[20px]">Car</p>
				<div className="flex bg-black gap-[15px] p-[15px] mt-[10px] max-w-[385px]">
					<Select name={"Make"} options={options} />
					<Select name={"Make"} options={options} />
				</div>
			</div>
			<div className="mt-[20px]">
				<p className="font-cond text-[20px]">Customer</p>
				<div className="flex justify-between">
					<div className="text-center mt-[10px]">
						<p>New</p>
						<div className="flex flex-col bg-black gap-[15px] p-[15px] mt-[10px]">
							<Input />
							<Input />
							<Input />
						</div>
					</div>
					<div className="text-center mt-[10px]">
						<p>Regular</p>
						<div className="flex flex-col bg-black gap-[15px] p-[15px] mt-[10px]">
							<Input />
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-row-reverse mt-[20px] items-center">
				<SubmitButton type={"submit"} styleType={"default"} text={"Order"} />
				<p className="font-cond text-[20px] text-orange font-medium mr-[30px]">
					$98 088
				</p>
			</div>
		</div>
	)
}