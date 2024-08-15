"use client"

import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import DefaultButton from "./defualt-button";
import Select from "./select";
import Input from "./input";
import { getCarsMakes } from "@/app/api/automobiles/route";
import { useState } from "react";
import { Make } from "@/app/lib/definitions";

export default function ModalContainer({
	modalName, options, children
}: {
	// formAction: () => void;
	modalName: string;
	options: Make[];
	children: React.ReactNode;
}) {
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		// formAction()
	}

	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => {
		setIsModalOpen(!isModalOpen)
	}

	const handleParentClick = (event: React.MouseEvent) => {
		const target = event.target as HTMLElement
		if (!target.closest('.modal-content')) { // Перевірка чи клік відбувся поза межами модального вікна
			openModal()
		}
	};

	return (
		<>
			<DefaultButton type={"button"} styleType={"add"} text={"+ Add Car"} onClickFunction={openModal} />
			<form onSubmit={handleSubmit} className={`${isModalOpen === true ? "block" : "hidden"}`}>
				<div className="bg-black/50 fixed w-screen inset-0 flex justify-center items-center" onClick={(e) => handleParentClick(e)}>
					<div className="bg-dirt-blue p-[30px] w-[800px] modal-content">
						<div className="flex justify-between">
							<h3 className="font-cond text-[24px]">{modalName}</h3>
							<XMarkIcon className="w-[24px] cursor-pointer" onClick={openModal} />
						</div>
						{children}
					</div>
				</div>
			</form>
		</>
	)
}