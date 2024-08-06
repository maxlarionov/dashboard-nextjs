import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import NavLinks from "./nav-links";
import Link from "next/link";


export default function SideNav() {
	return (
		<div className="flex items-stretch w-[280px] h-full flex-col p-[20px]">
			<div className="flex-none h-[160px] bg-yellow text-[#000000]">
				<h1 className="font-cond text-[32px] font-medium pt-[95px] pl-[12px]">PGA</h1>
				<p className="text-[16px] pl-[12px]">Perfect German Auto</p>
			</div>
			<div className="flex-none">
				<NavLinks />
			</div>
			<div className="bg-dirt-blue mt-[10px] flex-1"></div>
			<Link
				href={"/login"}
			>
				<div className="flex flex-none items-center bg-light-red mt-[10px] p-[8px]">
					<ArrowRightStartOnRectangleIcon className="w-6 ml-[2px]" />
					<h2 className="font-cond text-[20px] ml-[5px]">
						Sign out
					</h2>
				</div>
			</Link>
		</div>
	)
}