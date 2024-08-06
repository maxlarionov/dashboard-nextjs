import Image from "next/image";

export default function AutoItem() {
	return (
		<div className="flex w-[480px] h-[186px] border-solid border-[3px] border-dirt-blue">
			<Image
				src="https://i.ibb.co/dbCcJS3/audi-q7-2024.jpg"
				width={240}
				height={180}
				alt="Audi Q7 2024"
			/>
			<div className="pl-[20px] pt-[15px]">
				<h4 className="font-cond text-[20px] font-medium">
					AUDI Q7 2024
				</h4>
				<div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-[20px] mb-[20px]">
					<p>Petrol</p>
					<p>340 hp</p>
					<p>AWD</p>
					<p>SUV</p>
				</div>
				<p className="font-cond text-[20px] text-orange font-medium">
					$98 088
				</p>
			</div>
		</div>
	)
}