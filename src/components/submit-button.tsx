"use client"

import DefaultButton from "./defualt-button";

export default function SubmitButton({
	type, styleType, text
}: {
	type: "submit" | "reset" | "button" | undefined;
	styleType: string;
	text: string;
}) {


	return (
		<DefaultButton type={type} styleType={styleType} text={text} onClickFunction={() => { }} />
	)
}