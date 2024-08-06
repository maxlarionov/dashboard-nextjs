import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default function Card() {

	return (
		<div className="w-[380px] bg-dirt-blue p-[15px]">
			<div className="flex items-center">
				<CurrencyDollarIcon className="w-[24px] mr-[5px]" />
				<p>Colected</p>
			</div>
			<div className="bg-black pt-[34px] pb-[34px] mt-[15px] font-cond text-[24px] justify-center text-center">
				<p>$125,500.00</p>
			</div>
		</div>
	)
}