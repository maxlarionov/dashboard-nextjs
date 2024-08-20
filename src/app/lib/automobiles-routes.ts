

import { AllPages, Car, Make, Model } from "@/app/lib/definitions"
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

const ITEMS_PER_PAGE = 6
export async function getCurrentCars(query: string, currentPage: number) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE

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
				WHERE cars.model ILIKE ${`%${query}%`} OR cars.make ILIKE ${`%${query}%`}
				LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
			`
			return result.rows
		}
		if (!query) {
			const result = await sql<Car>`
			SELECT * FROM Cars WHERE CarID>0
			LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
			`
			return result.rows
		}

		return null
	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Current Cars")
	}
}

export async function getAllPages(query: string) {

	const result = await sql<AllPages>`
			SELECT Count(*)
				FROM cars
				WHERE cars.model ILIKE ${`%${query}%`} OR cars.make ILIKE ${`%${query}%`}
			`

	// console.log(`First: ${result.rows[0]}`)

	const totalPages = Math.ceil(Number(result.rows[0].count) / ITEMS_PER_PAGE)
	return totalPages

	// try {
	// 	if (query) {
	// 		const result = await sql<AllPages>`
	// 		SELECT Count(*)
	// 			FROM cars
	// 			WHERE cars.model ILIKE ${`%${query}%`} OR cars.make ILIKE ${`%${query}%`}
	// 		`

	// 		// console.log(`First: ${result.rows[0]}`)

	// 		const totalPages = Math.ceil(Number(result.rows[0].count) / ITEMS_PER_PAGE)
	// 		return totalPages
	// 	}
	// 	if (!query) {
	// 		const result = await sql<AllPages>`
	// 		SELECT COUNT (*) FROM Cars WHERE CarID>0
	// 		`

	// 		console.log(`Second: ${result.rows[0]}`)
	// 		return result.rows[0]
	// 	}

	// 	return null
	// } catch (error) {
	// 	console.error("Database Error:", error)
	// 	throw new Error("Failed to get the Current Cars")
	// }
}

