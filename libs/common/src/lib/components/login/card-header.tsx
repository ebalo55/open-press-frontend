"use client";

import { Divider, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { CONFIG } from "../../config";

export const CardHeader: FC = () => {
	return (
		<Stack
			spacing={"sm"}
			align={"center"}
			justify={"center"}
			mb={"xl"}
		>
			<Title
				order={1}
				size={"h2"}
				weight={700}
			>
				Login
			</Title>
			<Divider
				mx={"auto"}
				sx={{ width: "4rem" }}
			/>
			<Title
				order={2}
				size={"h5"}
				weight={500}
			>
				{CONFIG.app_name}
			</Title>
		</Stack>
	);
};
