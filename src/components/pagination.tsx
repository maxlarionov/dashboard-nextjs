"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Pagination({
	allPages
}: {
	allPages: number
}) {
	const searchParams = useSearchParams()
	const pathname = usePathname();
	const { replace } = useRouter()
	const currentPage = Number(searchParams.get('page')) || 1;
	const isFirst = currentPage <= 1
	const isLast = currentPage >= allPages


	const changePage = (page: number | string) => {
		const params = new URLSearchParams(searchParams)
		params.set("page", page.toString())
		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<div className="flex gap-[20px] justify-center mt-[30px]">
			<button
				onClick={() => changePage(currentPage - 1)}
				disabled={isFirst}
				className={`flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px]  ${isFirst ? "cursor-default border-[#0D1114] text-[#6e6e6e]" : "cursor-pointer border-dirt-blue"}`}
			>
				{'<'}
			</button>
			<div className="flex gap-2.5">
				<div className="flex h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue pl-2 pr-2">
					<p>{currentPage}/{allPages}</p>
				</div>
			</div>
			<button
				onClick={() => changePage(currentPage + 1)}
				disabled={isLast}
				className={`flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue ${isLast ? "cursor-default border-[#0D1114] text-[#6e6e6e]" : "cursor-pointer border-dirt-blue"}`}
			>
				<p>{'>'}</p>
			</button>
		</div>
	)
}