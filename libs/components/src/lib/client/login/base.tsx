"use client";

import { Flex } from "@mantine/core";
import { INJECTION_TOKENS } from "@open-press/frontend-interfaces";
import { useInject } from "@open-press/hooks";
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
