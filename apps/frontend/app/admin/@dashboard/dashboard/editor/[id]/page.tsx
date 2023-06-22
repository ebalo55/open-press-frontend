import { BlockEditor } from "@aetheria/components";

interface Params {
	id: string;
}

interface Props {
	params: Params;
}

export default function Page({ params }: Props) {
	const { id } = params;

	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				overflow: "hidden",
			}}
		>
			<BlockEditor id={id} />
		</div>
	);
}
