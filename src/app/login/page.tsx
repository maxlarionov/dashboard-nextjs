import DefaultButton from "@/components/defualt-button";
import Input from "@/components/input";
import Link from "next/link";

export default function Login() {
	return (
		<main className="flex flex-col w-screen h-screen justify-center items-center gap-[100px]">
			<div className="flex gap-[100px] items-center">
				<div className="flex-none h-[160px] w-[240px] bg-yellow text-black">
					<h1 className="font-cond text-[32px] font-medium pt-[95px] pl-[12px]">PGA</h1>
					<p className="text-[16px] pl-[12px]">Perfect German Auto</p>
				</div>
				<div className="">
					<h2 className="font-cond text-[24px]">
						Sign in to your account
					</h2>
					<div className="mt-[30px]">
						{/* <Input /> */}
					</div>
					<div className="mt-[10px] mb-[20px]">
						{/* <Input /> */}
					</div>
					<Link
						href={"/dashboard"}
					>
						{/* <DefaultButton /> */}
					</Link>
				</div>
			</div>
			<div className="text-center">
				<p className="font-light text-[14px] text-[#D3D3D3] mb-[5px]">
					This application was created for demonstration purposes only by Maks Larionov
				</p>
				<p className="font-light text-[14px] text-[#D3D3D3]">
					In order to sign in check to Github page of this project
				</p>
			</div>
		</main>
	)
}