"use client";

import {Flex} from "@mantine/core";
import {useInject} from "@open-press/hooks";
import {FC, Suspense} from "react";
import {INJECTION_TOKENS} from "@open-press/interfaces";

export default function Page(): JSX.Element {
    const Login = useInject<{ Card: FC }>(INJECTION_TOKENS.components.login);

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
