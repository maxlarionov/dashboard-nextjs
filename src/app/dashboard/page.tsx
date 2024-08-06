import BigCard from "@/components/dashboard/big-card";
import Card from "@/components/dashboard/card"
import { CalendarIcon, ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"


export default function Page() {
	return (
		<main className="mt-[14px]">
			<h2 className="font-cond text-[28px] font-medium"
			>
				Dashboard
			</h2>
			<div className="flex flex-wrap mt-5 mb-8 gap-x-4 gap-y-4">
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
			<div>
				<div className="flex flex-wrap gap-x-4 gap-y-4">
					<BigCard />
					<BigCard />
				</div>
			</div>
		</main>
	);
}
