import { CalendarIcon } from "@heroicons/react/24/outline";

export default function BigCard() {
	return (
		<div>
			<h3 className="font-cond text-[24px] mb-[15px]">
				Recent Revenue
			</h3>
			<div className=" bg-dirt-blue p-[15px]">
				<div className="bg-black pt-[412px] pl-[746px] pb-[15px] font-cond text-[24px] justify-center text-center">

				</div>
				<div className="flex items-center mt-[15px]">
					<CalendarIcon className="w-6 mr-[5px]" />
					<p>
						Last 12 months
					</p>
				</div>

			</div>
		</div>
	)
}