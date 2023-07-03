"use client";

import { Center, Loader, Stack } from "@mantine/core";
import { FC } from "react";

export const FullPage: FC = () => {
	return (
		<Center
			sx={{
				height: "100dvh",
				width: "100dvw",
			}}
		>
			<Stack
				align={"center"}
				justify={"center"}
			>
				<Loader variant={"bars"} />
			</Stack>
		</Center>
	);
};
