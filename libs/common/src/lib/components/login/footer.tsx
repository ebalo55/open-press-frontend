"use client";

import { Flex, Stack, Text } from "@mantine/core";
import { DateTime } from "luxon";
import Link from "next/link";
import { FC } from "react";

export const Footer: FC = () => {
	return (
		<Flex
			w={"100%"}
			h={"100%"}
			align={"center"}
			justify={"center"}
		>
			<Stack
				spacing={0}
				align={"center"}
				justify={"center"}
			>
				<Text size={"sm"}>
					<Link
						href={"https://aetheria.override.sh"}
						target={"_blank"}
					>
						Aetheria
					</Link>{" "}
					© {DateTime.now().year}
				</Text>
			</Stack>
		</Flex>
	);
};
