"use client"

import { Customer, Model } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import SelectCar from "./automobiles/select-car";
import DefaultButton from "./defualt-button";
import { createInvoice } from "@/app/lib/actions";
import Input from "./input";

export default function CarOrdering({
	options,
	filteredCustomers,
	setIsModalOpen,
	refresh,
	setCurrentScreen
}: {
	options: Model[]
	filteredCustomers: Customer[]
	setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
	refresh?: boolean
	setCurrentScreen: React.Dispatch<React.SetStateAction<string>>
}) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()
	const [currentCustomer, setCurrentCustomer] = useState("")
	const [customerName, setCustomerName] = useState("")
	const [customerEmail, setCustomerEmail] = useState("")
	const [customerCity, setCustomerCity] = useState("")
	const [customersModal, setCustomersModal] = useState(false)
	const [selectedCar, setSelectedCar] = useState<Model>({ make: "", model: "", price: 0, carid: "" })
	const car = options.filter((car) => car.model === selectedCar.model)

	useEffect(() => {
		resetModal()
	}, [refresh])

	const resetModal = () => {
		const params = new URLSearchParams(searchParams)
		params.delete('customer')
		replace(`${pathname}?${params.toString()}`)
		setCustomerName("")
		setCustomerEmail("")
		setCustomerCity("")
		setCurrentCustomer("")
		setSelectedCar({ make: "", model: "", price: 0, carid: "" })
		console.log(999);
	}

	const handleSearch = useDebouncedCallback((term) => {
		setCustomersModal(true)
		const params = new URLSearchParams(searchParams)
		if (term) {
			params.set('customer', term)
		} else {
			params.delete('customer')
		}
		replace(`${pathname}?${params.toString()}`)
	}, 1000)

	const handleOption = (term: string) => {
		const params = new URLSearchParams(searchParams)
		if (term) {
			params.set('customer', term)
		} else {
			params.delete('customer')
		}
		setCurrentCustomer(term)
		setCustomersModal(false)

		replace(`${pathname}?${params.toString()}`)
	}

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.relatedTarget && e.relatedTarget.id === 'tooltip') {
			e.preventDefault()
			return;
		}
		setCustomersModal(false)
	}

	const handleClickTooltip = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
	}
	const params = new URLSearchParams(searchParams)
	console.log(`WHAT?: ${pathname}?${params.toString()}`);


	const order = async () => {
		try {

			if (currentCustomer !== "") {
				const customerData = filteredCustomers.filter((customer) => customer.name === currentCustomer)
				const customerId = customerData[0].id
				const car = options.filter((car) => car.model === selectedCar.model)
				const customerCar = car[0].carid
				const customerCarAmount = car[0].price

				console.log({ customerId, customerCar, customerCarAmount, newCustomer: false })

				await createInvoice({ customerId, customerCar, customerCarAmount, newCustomer: false })
					.then(() => {
						if (setIsModalOpen)
							setIsModalOpen(false)
						resetModal()
						if (pathname.includes('automobiles') === true)
							setCurrentScreen("first")
						console.log('11 Invoice created successfully')
					})
					.catch((error) => {
						console.error('11 Error creating invoice:', error)
					});

			} else {
				console.log(2)

				const car = options.filter((car) => car.model === selectedCar.model)
				const customerCar = car[0].carid
				const customerCarAmount = car[0].price
				console.log({ customerName, customerEmail, customerCity, customerCar, customerCarAmount, newCustomer: true })


				await createInvoice({ customerName, customerEmail, customerCity, customerCar, customerCarAmount, newCustomer: true })
					.then(() => {
						if (setIsModalOpen)
							setIsModalOpen(false)
						resetModal()
						if (pathname.includes('automobiles') === true)
							setCurrentScreen("first")
						console.log('22 Invoice created successfully')
					})
					.catch((error) => {
						console.error('22 Error creating invoice:', error)
					})
			}
		} catch (error) {
			console.error("Error:", error)
		}
	};

	return (
		<div className="mt-[20px] w-[740px]">
			<div>
				<p className="font-cond text-[20px]">Car</p>
				<div className="flex bg-black gap-[15px] p-[15px] mt-[10px] max-w-[385px]">
					<SelectCar options={options} isSearch={false} setSelectedCar={setSelectedCar} />
				</div>
			</div>
			<div className="mt-[20px]">
				<p className="font-cond text-[20px]">Customer</p>
				<div className="flex justify-between">
					<div className="text-center mt-[10px]">
						<p>New</p>
						<div className="flex flex-col bg-black gap-[15px] p-[15px] mt-[10px]">
							<Input placeholder="Name..." value={customerName} onChange={setCustomerName} />
							<Input placeholder="Email..." value={customerEmail} onChange={setCustomerEmail} />
							<Input placeholder="City..." value={customerCity} onChange={setCustomerCity} />
						</div>
					</div>
					<div className="text-center mt-[10px]">
						<p>Regular</p>
						<div className="flex relative flex-col bg-black gap-[15px] p-[15px] mt-[10px]">
							<input
								value={currentCustomer}
								className="block w-[300px] border-[3px] border-dirt-blue py-1.5 pl-2.5 bg-black pr-20 text-gray-900 placeholder:text-gray-400"
								placeholder={"Search customer..."}
								onFocus={() => setCustomersModal(true)}
								onBlur={handleBlur}
								onChange={(e) => {
									handleSearch(e.target.value);
									setCurrentCustomer(e.target.value)
								}}
							/>
							{customersModal && (
								<div className="absolute flex flex-col w-[300px] text-left top-[50px] bg-black p-[10px]">
									{filteredCustomers.map((customer) => (
										<div
											key={customer.name}
											className="pb-[5px] pt-[5px] cursor-pointer hover:text-yellow"
											onMouseDown={handleClickTooltip} // Запобігає закриттю при кліку на підказку
											onClick={() => handleOption(customer.name)}
										>{customer.name}</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>

			</div>
			<div className="flex flex-row-reverse mt-[20px] items-center">
				<DefaultButton type={"button"} styleType={"default"} text={"Order"} onClickFunction={order} />
				{selectedCar.model !== "" && (
					<p className="font-cond text-[20px] text-orange font-medium mr-[30px]">
						${car[0].price || 0}
					</p>
				)}
			</div>
		</div>
	)
}