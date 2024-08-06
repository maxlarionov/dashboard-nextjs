"use client"

import { HomeIcon, InformationCircleIcon, QueueListIcon, Squares2X2Icon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
	{ name: 'Home', href: '/dashboard', icon: HomeIcon },
	{ name: 'Automobiles', href: '/dashboard/automobiles', icon: Squares2X2Icon },
	{ name: 'Invoices', href: '/dashboard/invoices', icon: QueueListIcon },
	{ name: 'Info', href: '/dashboard/info', icon: InformationCircleIcon },
]

export default function NavLinks() {
	const pathname = usePathname()

	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon
				return (
					<Link
						key={link.name}
						href={link.href}
						className={`flex items-center bg-dirt-blue mt-[10px] p-[8px] hover:bg-hover-blue ${pathname === link.href ? "text-yellow" : ""}`}
					>
						<LinkIcon className="w-6 ml-[2px]" />
						<h3 className="font-cond text-[20px] ml-[5px]">
							{link.name}
						</h3>
					</Link>
				)
			})}
		</>
	)
}