"use client";

import { Flex } from "@mantine/core";
import { Login } from "@open-press/components";

export default function Page(): JSX.Element {
	return (
		<Flex
			align={"center"}
			justify={"center"}
			w={"100%"}
			h={"100%"}
		>
			<Login.Card />
		</Flex>
	);
}
