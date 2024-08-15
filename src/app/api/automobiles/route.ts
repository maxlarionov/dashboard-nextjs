import { Car, Make, Model } from "@/app/lib/definitions"
import { sql } from "@vercel/postgres"

export const revalidate = 0

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

export async function getCarsMakeAndModels() {
	try {
		const result = await sql<Car>`SELECT cars.model, cars.make FROM cars`

		// console.log(result.rows)

		return result.rows
	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Models")
	}
}

export async function getCurrentCars(query: string) {
	try {
		if (query) {
			const result = await sql<Car>`
			SELECT
					cars.carid,
					cars.make,
					cars.model,
					cars.fuel,
					cars.power,
					cars.powertrain,
					cars.description,
					cars.category,
					cars.price,
					cars.image
				FROM cars
				WHERE cars.model ILIKE ${`%${query}%`} OR cars.make ILIKE ${`%${query}%`};
			`
			// WHERE cars.model = ${`%${query}%`} OR cars.make ILIKE ${`%${query}%`};

			console.log(query)
			return result.rows
		}
		if (!query) {
			const result = await sql<Car>`SELECT * FROM Cars WHERE CarID>0`
			return result.rows
		}

		return null
	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Current Cars")
	}
}

