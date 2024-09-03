
import { Customer, TInvoicesTable } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { log } from 'console';
import { z } from 'zod';

const FormSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	amount: z.coerce.number(),
	status: z.enum(['pending', 'paid']),
	date: z.string(),
})

const CreateInvoice = FormSchema.omit({ id: true, date: true })

export async function createInvoice({
	customerId,
	customerName,
	customerCar,
	customerCarAmount,
	customerEmail,
	customerCity,
	newCustomer
}: {
	customerId?: string
	customerName?: string
	customerCar: string
	customerCarAmount: number
	customerEmail?: string
	customerCity?: string
	newCustomer: boolean
}) {


	const date = new Date().toISOString().split('T')[0]

	try {
		if (newCustomer === true) {
			await sql`
      INSERT INTO pga_customers (name, email, city)
      VALUES (${customerName}, ${customerEmail}, ${customerCity})
			`
			const customer = await sql`
			SELECT 
				pga_customers.id
			FROM pga_customers
			WHERE pga_customers.name = ${customerName}
			`

			const customerid = customer.rows[0]
			console.log(customerid, customerid.id)

			await sql`
      INSERT INTO pga_invoices (customerid, carid, amount, status, date)
      VALUES (${customerid.id}, ${customerCar}, ${customerCarAmount}, 'prnding', ${date})
    	`
		} else {

			console.log({ customerId, customerCar, customerCarAmount, status: 'pending', date });

			await sql`
  	  INSERT INTO pga_invoices (customerid, carid, amount, status, date)
      VALUES (${customerId}, ${customerCar}, ${customerCarAmount}, 'pending', ${date})
			
    `
		}
		// INSERT INTO pga_invoices (customerid, carid, amount, status, date)
		// VALUES ('3958dc9e-712f-4377-85e9-fec4b6a6442a', '9f3c794a-7296-4320-a05a-69f960321fef', 12311, 'Pending', '2024-09-03')

	} catch (error) {
		return {
			message: 'Database Error: Failed to Create Invoice.',
		}
	}
}

const ITEMS_PER_PAGE = 6;
export async function getCurrentInvoices(
	query: string,
	currentPage: number,
) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE

	try {
		const invoices = await sql<TInvoicesTable>`
      SELECT
        pga_invoices.id,
        pga_invoices.amount,
        pga_invoices.date,
        pga_invoices.status,
        pga_invoices.carid,
        pga_customers.name,
        pga_customers.email,
        pga_customers.city
      FROM pga_invoices
      JOIN pga_customers ON pga_invoices.customerid = pga_customers.id
      WHERE
        pga_customers.name ILIKE ${`%${query}%`} OR
        pga_customers.email ILIKE ${`%${query}%`} OR
        pga_customers.city ILIKE ${`%${query}%`} OR
        pga_invoices.amount::text ILIKE ${`%${query}%`} OR
        pga_invoices.date::text ILIKE ${`%${query}%`} OR
        pga_invoices.carid::text ILIKE ${`%${query}%`} OR
        pga_invoices.status ILIKE ${`%${query}%`}
      ORDER BY pga_invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

		// console.log(invoices.rows);


		return invoices.rows;
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to get invoices.')
	}
}

export async function getCurrentCustomers(
	currentCustomer: string,
) {

	try {
		const customers = await sql<Customer>`
      SELECT
        *
      FROM pga_customers
      WHERE
        pga_customers.name ILIKE ${`%${currentCustomer}%`}
      LIMIT 5
    `;

		return customers.rows;
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to get customers.')
	}
}

export async function getAllInvoicesPages(query: string) {
	try {
		const result = await sql`
			SELECT COUNT(*)
				FROM pga_invoices
				JOIN pga_customers ON pga_invoices.customerid = pga_customers.id
				WHERE
        pga_customers.name ILIKE ${`%${query}%`} OR
        pga_customers.email ILIKE ${`%${query}%`} OR
        pga_invoices.amount::text ILIKE ${`%${query}%`} OR
        pga_invoices.date::text ILIKE ${`%${query}%`} OR
        pga_invoices.status ILIKE ${`%${query}%`}
			`

		// console.log(`First: ${result.rows[0]}`)

		const totalPages = Math.ceil(Number(result.rows[0].count) / ITEMS_PER_PAGE)
		return totalPages

	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Invoices Pages")
	}

}