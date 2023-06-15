"use client";

import { BlockEditor } from "@open-press/components";

interface Params {
	id: string;
}

interface Props {
	params: Params;
}

export default function Page({ params }: Props) {
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				overflow: "hidden",
			}}
		>
			<BlockEditor />
		</div>
	);
}
