
import { Customer, TInvoicesTable } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { z } from 'zod';

const FormSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	amount: z.coerce.number(),
	status: z.enum(['pending', 'paid']),
	date: z.string(),
})

const CreateInvoice = FormSchema.omit({ id: true, date: true })

export async function createInvoice(formData: FormData) {
	const { customerId, amount, status } = CreateInvoice.parse({
		customerId: formData.get('customerId'),
		amount: formData.get('amount'),
		status: formData.get('status'),
	})
	const amountInCents = amount * 100
	const date = new Date().toISOString().split('T')[0]

	try {
		await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `
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
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const invoices = await sql<TInvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

		return invoices.rows;
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to get invoices.');
	}
}

export async function getCurrentCustomers(
	currentCustomer: string,
) {

	try {
		const customers = await sql<Customer>`
      SELECT
        customers.name
      FROM customers
      WHERE
        customers.name ILIKE ${`%${currentCustomer}%`}
      LIMIT 5
    `;

		return customers.rows;
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to get customers.');
	}
}

export async function getAllInvoicesPages(query: string) {
	try {
		const result = await sql`
			SELECT COUNT(*)
				FROM invoices
				JOIN customers ON invoices.customer_id = customers.id
				WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
			`

		// console.log(`First: ${result.rows[0]}`)

		const totalPages = Math.ceil(Number(result.rows[0].count) / ITEMS_PER_PAGE)
		return totalPages

	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Invoices Pages")
	}

}