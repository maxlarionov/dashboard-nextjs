import { Car, Make, Model } from "@/app/lib/definitions"
import { sql } from "@vercel/postgres"

export async function getAllCars() {
	try {
		const data = await sql`SELECT * FROM Pets`

		// console.log(data);


		return data.rows
	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Cars")
	}
}

export async function getCars() {
	try {
		const result = await sql<Car>`SELECT * FROM Cars WHERE CarID>0`

		// console.log(result.rows);


		return result.rows
	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Cars")
	}
}

export async function getCarsMakes() {
	try {
		const result = await sql<Make>`SELECT Make FROM Cars`

		// console.log(result.rows)


		return result.rows
	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Makes")
	}
}

export async function getCarsModal() {
	try {
		const result = await sql<Model>`SELECT cars.model, cars.make FROM cars`

		// console.log(result.rows)

		return result.rows
	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Models")
	}
}

