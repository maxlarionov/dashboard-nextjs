
export type TInvoicesTable = {
	id: string
	customerid: string
	name: string
	carid: string
	date: string
	amount: number
	status: 'pending' | 'paid'
	email?: string
	city?: string
	new?: boolean
}



export type Car = {
	carid: string
	make: string
	model: string
	fuel: string
	power: string
	powertrain: string
	category: string
	description: string
	price: string
	image: string
}

export type Make = {
	make: string
}

export type Model = {
	model: string
	make: string
	carid: string
	price: number
}

export type AllPages = {
	count: string
}

export type Customer = {
	id: string
	name: string
	email: string
	city: string
}