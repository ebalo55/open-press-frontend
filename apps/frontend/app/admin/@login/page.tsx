"use client";

import { Flex } from "@mantine/core";
import { useInject } from "@open-press/hooks";
import { FC, Suspense } from "react";

export default function Page(): JSX.Element {
	const Login = useInject<{ Card: FC }>("Login");

	return (
		<Flex
			align={"center"}
			justify={"center"}
			w={"100%"}
			h={"100%"}
		>
			<Suspense fallback={<div>Loading...</div>}>
				<Login.Card />
			</Suspense>
		</Flex>
	);
}
