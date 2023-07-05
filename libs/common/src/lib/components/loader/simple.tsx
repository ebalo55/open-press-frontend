"use client";

import { Center, Loader, LoaderProps } from "@mantine/core";
import { FC } from "react";

export const Simple: FC<LoaderProps> = (props) => {
	return (
		<Center>
			<Loader
				variant={"bars"}
				{...props}
			/>
		</Center>
	);
};
