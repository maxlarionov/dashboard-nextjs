"use client"

import React, { useEffect } from 'react'
import { XMarkIcon } from "@heroicons/react/24/outline";
import DefaultButton from "./defualt-button";
import { useState } from "react";
import { Customer, Model } from '@/app/lib/definitions';
import CarOrdering from './car-ordering';
import CarDescription from './car-description';
import { usePathname } from 'next/navigation';

interface ChildProps {
	openModal: () => void;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	refresh: boolean
}

export default function ModalContainer({
	modalName, options, filteredCustomers, screen
}: {
	// formAction: () => void;
	modalName: string;
	// children: React.ReactElement<ChildProps> | React.ReactElement<ChildProps>[];
	options: Model[]
	filteredCustomers: Customer[]
	screen: string
}) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [refresh, setRefresh] = useState(true)
	const [currentScreen, setCurrentScreen] = useState("first")
	const pathname = usePathname()

	const openModal = () => {
		setIsModalOpen(!isModalOpen)
		setRefresh(!refresh)
		if (pathname.includes('automobiles') === true)
			setCurrentScreen("first")
	}

	const handleParentClick = (event: React.MouseEvent) => {
		const target = event.target as HTMLElement
		if (!target.closest('.modal-content')) { // Перевірка чи клік відбувся поза межами модального вікна
			openModal()
		}
	};

	useEffect(() => {
		setCurrentScreen(screen)
	}, [])

	// const clonedChildren = React.Children.map(children, (child) => {
	// 	if (React.isValidElement(child)) {
	// 		return React.cloneElement(child, { setIsModalOpen, refresh });
	// 	}
	// 	return child;
	// });

	// useEffect(() => {
	// 	const handleClick = (event) => {
	// 		console.log(event.target.name);
	// 		if (event.target.name === "first") {
	// 			""
	// 		} else {
	// 			""
	// 		}
	// 	};

	// 	const modalButtons = document.querySelectorAll(".modal_button");

	// 	modalButtons.forEach((button) => {
	// 		button.addEventListener('click', handleClick);
	// 	});

	// 	return () => {
	// 		modalButtons.forEach((button) => {
	// 			button.removeEventListener('click', handleClick);
	// 		});
	// 	};
	// }, []);


	return (
		<>
			<DefaultButton type={"button"} styleType={"add"} text={"+ Add Car"} onClickFunction={openModal} />
			<div className={`${isModalOpen === true ? "block" : "hidden"}`}>
				<div className="bg-black/50 fixed w-screen inset-0 flex justify-center items-center" onClick={(e) => handleParentClick(e)}>
					<div className="bg-dirt-blue p-[30px] modal-content">
						<div className="flex justify-between">
							<h3 className="font-cond text-[24px]">{modalName}</h3>
							<XMarkIcon className="w-[24px] cursor-pointer" onClick={openModal} />
						</div>
						{/* {clonedChildren} */}
						{currentScreen === "first" ? (
							<CarDescription setCurrentScreen={setCurrentScreen} />
						) : (
							<CarOrdering options={options} filteredCustomers={filteredCustomers} refresh={refresh} setIsModalOpen={setIsModalOpen} setCurrentScreen={setCurrentScreen} />
						)}
					</div>
				</div>
			</div>
		</>
	)
}