import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import DefaultButton from "./defualt-button";
import Select from "./select";
import Input from "./input";

export default function Modal2() {
	return (
		<div className="bg-black/50 fixed w-screen inset-0 flex justify-center items-center">
			<div className="bg-dirt-blue p-[30px] w-[800px]">
				<div className="flex justify-between">
					<h3 className="font-cond text-[24px]">Car Ordering</h3>
					<XMarkIcon className="w-[24px]" />
				</div>
				<div className="mt-[20px]">
					<div>
						<p className="font-cond text-[20px]">Car</p>
						<div className="flex bg-black gap-[15px] p-[15px] mt-[10px] max-w-[385px]">
							<Select />
							<Select />
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
						<DefaultButton />
						<p className="font-cond text-[20px] text-orange font-medium mr-[30px]">
							$98 088
						</p>
					</div>
				</div>
			</div>
		</div>

	)
}