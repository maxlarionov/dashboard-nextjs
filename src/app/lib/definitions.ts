
export type TInvoicesTable = {
	id: string;
	customerid: string;
	name: string;
	email: string;
	carid: string;
	date: string;
	amount: number;
	status: 'pending' | 'paid';
}

export type Car = {
	carid: string;
	make: string;
	model: string;
	fuel: string;
	power: string;
	powertrain: string;
	category: string;
	description: string;
	price: string;
	image: string;
}

export type Make = {
	make: string;
}

export type Model = {
	model: string;
	make: string;
	carid: string;
	price: number;
}

export type AllPages = {
	count: string
}

export type Customer = {
	name: string
}