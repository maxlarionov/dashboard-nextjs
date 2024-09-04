"use server"

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';

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
	newCustomer,
}: {
	customerId?: string;
	customerName?: string;
	customerCar: string;
	customerCarAmount: number;
	customerEmail?: string;
	customerCity?: string;
	newCustomer: boolean;
}) {
	console.log('POSTGRES_URL:', process.env.POSTGRES_URL);
	console.log(`cust: ${customerName}, ${customerEmail}, ${customerCity}`);

	const date = new Date().toISOString().split('T')[0]

	try {
		if (newCustomer === true) {
			console.log(1111);

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

		revalidatePath('/dashboard/invoices')
		return { success: true }
	} catch (error) {
		console.error('Database Error:', error);
		return { success: false, message: 'Failed to create invoice' };
	}
}