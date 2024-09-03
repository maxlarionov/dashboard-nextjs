import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Input from "./input";

export default function NewCustomer() {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleName = (term: string) => {
		const params = new URLSearchParams(searchParams)
		if (term) {
			params.set('name', term)
		} else {
			params.delete('name')
		}
		replace(`${pathname}?${params.toString()}`)
	}

	const handleEmail = (term: string) => {
		const params = new URLSearchParams(searchParams)
		if (term) {
			params.set('email', term)
		} else {
			params.delete('email')
		}
		replace(`${pathname}?${params.toString()}`)
	}

	const handleCity = (term: string) => {
		const params = new URLSearchParams(searchParams)
		if (term) {
			params.set('city', term)
		} else {
			params.delete('city')
		}
		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<div className="text-center mt-[10px]">
			<p>New</p>
			<div className="flex flex-col bg-black gap-[15px] p-[15px] mt-[10px]">
				<Input placeholder="Name..." onChange={handleName} defaultValue={searchParams.get('name')?.toString()} />
				<Input placeholder="Email..." onChange={handleEmail} defaultValue={searchParams.get('email')?.toString()} />
				<Input placeholder="City..." onChange={handleCity} defaultValue={searchParams.get('city')?.toString()} />
			</div>
		</div>
	)
}