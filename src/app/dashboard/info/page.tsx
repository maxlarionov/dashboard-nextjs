
import { getInv } from "@/app/lib/invoices-route"
import DefaultButton from "@/components/defualt-button"
import { useState } from "react"


export default async function Page() {
	const data = await getInv()


	console.log(data)


	return (
		<main className="mt-[14px] max-w-[560px]">
			<h2 className="font-cond text-[28px] font-medium"
			>
				Info
			</h2>
			<div className="mt-[20px] mb-[20px]">
				<p className="text-[24px] font-light mt-[10px]">
					This project is created to demonstrate programming skills and has nothing to do with real companies or products.
				</p>
				<p className="text-[24px] font-light mt-[10px]">
					The main technologies used in the project: JavaScript, React, Next.js.
				</p>
				<p className="text-[24px] font-light mt-[10px]">
					The application was created by <a className="font-medium text-[24px] underline">Max Larionov</a>
				</p>
				<p className="text-[24px] font-light">
					More projects on the <a className="font-medium text-[24px] underline">GitHub</a> platform
				</p>
			</div>
			{/* <DefaultButton /> */}
			<button>Count</button>
			<div>
				{/* {data.map((invoice) => (
					<p key={invoice.id}>{invoice.name}</p>
				))} */}
			</div>
		</main >
	)
}