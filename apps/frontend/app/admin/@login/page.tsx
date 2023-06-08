"use client";

import { Flex } from "@mantine/core";
import { useInject } from "@open-press/hooks";
import { Suspense } from "react";
// import { Login } from "@open-press/components";

export default function Page(): JSX.Element {
	const Login = useInject("Login");
	console.log("Login", Login);

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
