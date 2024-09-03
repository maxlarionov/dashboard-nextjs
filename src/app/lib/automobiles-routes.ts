

import { AllPages, Car, Make, Model } from "@/app/lib/definitions"
import { sql } from "@vercel/postgres"

export const revalidate = 0

export async function getCars() {
	try {
		const result = await sql<Car>`SELECT * FROM pga_cars`

		return result.rows
	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Cars")
	}
}

export async function getCarsMakes() {
	try {
		const result = await sql<Make>`SELECT Make FROM pga_cars`

		return result.rows
	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Makes")
	}
}

export async function getCarsMakeAndModels() {
	try {
		const result = await sql<Model>`SELECT pga_cars.model, pga_cars.make, pga_cars.carid, pga_cars.price FROM pga_cars`

		// console.log(result.rows)

		return result.rows
	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Models")
	}
}

const ITEMS_PER_PAGE = 2
export async function getCurrentCars(query: string, currentPage: number) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE

	try {
		if (query) {
			const result = await sql<Car>`
			SELECT
					pga_cars.carid,
					pga_cars.make,
					pga_cars.model,
					pga_cars.fuel,
					pga_cars.power,
					pga_cars.powertrain,
					pga_cars.description,
					pga_cars.category,
					pga_cars.price,
					pga_cars.image
				FROM pga_cars
				WHERE pga_cars.model ILIKE ${`%${query}%`} OR pga_cars.make ILIKE ${`%${query}%`}
				LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
			`
			return result.rows
		}
		if (!query) {
			const result = await sql<Car>`
			SELECT * FROM pga_cars
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

export async function getAllCarsPages(query: string) {
	try {
		const result = await sql<AllPages>`
			SELECT COUNT(*)
				FROM pga_cars
				WHERE pga_cars.model ILIKE ${`%${query}%`} OR pga_cars.make ILIKE ${`%${query}%`}
			`

		const totalPages = Math.ceil(Number(result.rows[0].count) / ITEMS_PER_PAGE)
		return totalPages

	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to get the Current Cars")
	}

}

