"use client";

import { INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { useInject } from "@aetheria/hooks";
import { Flex } from "@mantine/core";
import { FC, Suspense } from "react";

export const LoginBase: FC = () => {
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
};
