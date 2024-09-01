"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Pagination({
	allPages
}: {
	allPages: number
}) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()
	const currentPage = Number(searchParams.get('page')) || 1;
	const pagesList = Array.from({ length: allPages }, (_, i) => i + 1)

	const pageAlign = () => {
		if (allPages <= 3) {
			return pagesList
		} else if (currentPage === 1) {
			return [1, 2, 3]
		} else if (currentPage === allPages) {
			return [allPages - 2, allPages - 1, allPages]
		} else {
			return [currentPage - 1, currentPage, currentPage + 1]
		}
	}
	const [activePages, setActivePages] = useState(pageAlign)
	const isFirst = activePages[0] <= 1
	const isLast = activePages.includes(allPages)

	useEffect(() => {
		setActivePages(pageAlign)
	}, [currentPage, allPages])


	const changePage = (page: number | string) => {
		const params = new URLSearchParams(searchParams)
		params.set("page", page.toString())
		replace(`${pathname}?${params.toString()}`)
	}

	const changeActivePages = (type: string) => {
		let newActivePages
		if (type === "next") {
			newActivePages = pagesList.slice(activePages[0] + 2, activePages[0] + 5)
			if (newActivePages.length < 3) {
				newActivePages = pagesList.slice(-3)
			}
		} else {
			newActivePages = pagesList.slice(activePages[0] - 4, activePages[0] - 1)
			if (newActivePages.length < 3) {
				newActivePages = pagesList.slice(0, 3)
			}
		}
		setActivePages(newActivePages)
	}

	return (
		<div className="flex gap-[20px] justify-center mt-[30px]">
			<button
				onClick={() => changeActivePages("prev")}
				disabled={isFirst}
				className={`flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px]  ${isFirst ? "cursor-default border-[#0D1114] text-[#6e6e6e]" : "cursor-pointer border-dirt-blue"}`}
			>
				{'<'}
			</button>
			<div className="flex gap-2.5">
				{activePages.map((page) => (
					<div
						key={page}
						onClick={() => changePage(page)}
						className={`flex h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue pl-2 pr-2 cursor-pointer ${currentPage === page ? "bg-dirt-blue" : "bg-black"}`}>
						<p>{page}</p>
					</div>
				))}
			</div>
			<button
				onClick={() => changeActivePages("next")}
				disabled={isLast}
				className={`flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px] ${isLast ? "cursor-default border-[#0D1114] text-[#6e6e6e]" : "cursor-pointer border-dirt-blue"}`}
			>
				<p>{'>'}</p>
			</button>
		</div>
	)
}