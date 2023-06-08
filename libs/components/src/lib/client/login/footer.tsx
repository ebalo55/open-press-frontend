"use client";

import { CONFIG } from "@frontend/config";
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
					{CONFIG.app_name} © {DateTime.now().year}
				</Text>
				<Text size={"sm"}>
					Made with{" "}
					<span
						role={"img"}
						aria-label={"love"}
					>
						❤️
					</span>{" "}
					by <Link href={"https://open-press.override.sh"}>OpenPress</Link>
				</Text>
			</Stack>
		</Flex>
	);
};
