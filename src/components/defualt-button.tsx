export default function DefaultButton({
	type, styleType, text, onClickFunction
}: {
	type: "submit" | "reset" | "button" | undefined;
	styleType: string;
	text: string;
	onClickFunction: () => void;
}) {
	return (
		<button
			type={type}
			onClick={onClickFunction}
			className={`mr-[10px] whitespace-nowrap ${styleType === "add" ? "bg-green hover:bg-[#2CFF3F]" : "bg-yellow hover:bg-[#FFC01F]"} text-black focus:ring-2 focus:ring-white font-bold px-[30px] py-[7px] focus:outline-none`}>
			{text}
		</button>
	)
}