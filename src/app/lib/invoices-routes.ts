
"use server"

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