import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import DefaultButton from "./defualt-button";

export default function Modal() {
	return (
		<div className="bg-black/50 fixed w-screen inset-0 flex justify-center items-center">
			<div className="bg-dirt-blue p-[30px] w-[1020px]">
				<div className="flex justify-between">
					<h3 className="font-cond text-[24px]">Car Description</h3>
					<XMarkIcon className="w-[24px]" />
				</div>
				<div className="flex mt-[10px]">
					<Image
						src="https://i.ibb.co/dbCcJS3/audi-q7-2024.jpg"
						width={480}
						height={355}
						alt="Audi Q7 2024"
					/>
					<div className="flex ml-[60px] h-100% flex-col justify-between">
						<div>
							<h4 className="font-cond text-[20px] font-medium">
								AUDI Q7 2024
							</h4>
							<p className="font-cond text-[20px] text-orange font-medium mt-[15px]">
								$98 088
							</p>
						</div>
						<div className="grid grid-cols-2 gap-y-2.5 mt-[15px] mb-[15px]">
							<p className="font-medium">Fuel</p>
							<p>Petrol</p>
							<p className="font-medium">Power</p>
							<p>340 hp</p>
							<p className="font-medium">Powertrain</p>
							<p>AWD</p>
							<p className="font-medium">Category</p>
							<p>SUV</p>
						</div>
						<p>
							Automatic transmission, automatic climatisation (4 zones), self-steering systems, rear, 360° camera, adaptive cruise control, android auto.
						</p>
						<div className="flex justify-between">
							{/* <DefaultButton />
							<DefaultButton /> */}
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}