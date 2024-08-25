"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Input from "./input";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
	placeholder
}: {
	placeholder: string
}) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', '1');
		if (term) {
			params.set('query', term)
		} else {
			params.delete('query')
		}
		replace(`${pathname}?${params.toString()}`)
	}, 1000)

	return (
		<input
			className="block w-[300px] border-[3px] border-dirt-blue py-1.5 pl-2.5 bg-black pr-20 text-gray-900 placeholder:text-gray-400"
			placeholder={placeholder}
			onChange={(e) => {
				handleSearch(e.target.value);
			}}
			defaultValue={searchParams.get('query')?.toString()}
		/>
	)
}