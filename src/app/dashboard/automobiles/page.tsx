import { getAllCars, getCars, getCarsMakes, getCarsModal } from "@/app/api/automobiles/route";
import AutoItem from "@/components/automobiles/auto-item";
import DefaultButton from "@/components/defualt-button";
import Input from "@/components/input";
import ModalContainer from "@/components/modal-container";
import CarOrdering from "@/components/car-ordering";
import SelectCar from "@/components/automobiles/select-car";
// import { useState } from "react";

export default async function Page() {
	const cars = await getCars()
	const makes = await getCarsMakes()
	const model = await getCarsModal()

	// console.log(cars)

	return (
		<main className="mt-[14px] max-w-[1504px]">
			<h2 className="font-cond text-[28px] font-medium"
			>
				Automobiles
			</h2>
			<div className="flex mt-[20px] justify-between">
				<div className="flex w-full gap-x-[20px]">
					<Input />
					<SelectCar name={"Make"} options={model} />
					{/* <DefaultButton type={"button"} styleType={"dafault"} text={"Search"} onClickFunction={() => { }} /> */}
				</div>
				{/* <Modal2 formAction={() => { }} options={makes} /> */}
				<ModalContainer modalName={"Car Ordering"} options={model}>
					<CarOrdering options={model} />
				</ModalContainer>
			</div>
			<div className="mt-5 grid grid-cols-3 gap-[20px] xl:grid-cols-2 2xl:grid-cols-3">
				{cars?.map((car) => (
					<AutoItem key={car.carid} car={car} />
				))}
			</div>
			<div className="flex gap-[20px] justify-center mt-[30px]">
				<div className="flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue">
					<p>{'<'}</p>
				</div>
				<div className="flex gap-2.5">
					<div className="flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue">
						<p>1</p>
					</div>
					<div className="flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue">
						<p>2</p>
					</div>
					<div className="flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue">
						<p>3</p>
					</div>
				</div>
				<div className="flex w-[30px] h-[30px] justify-center items-center border-solid border-[3px] border-dirt-blue">
					<p>{'>'}</p>
				</div>
			</div>
		</main>
	)
}