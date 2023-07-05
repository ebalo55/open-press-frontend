"use client";

import { INJECTION_TOKENS, TableLoaderProps } from "@aetheria/frontend-interfaces";
import { LoaderProps, Text } from "@mantine/core";
import { FC } from "react";
import { useInject } from "../../hooks";

export const Table: FC<TableLoaderProps> = ({ columns, children, ...others }) => {
	const Loader = useInject<{ Simple: FC<LoaderProps> }>(INJECTION_TOKENS.components.loaders);

	return (
		<tr>
			<td colSpan={columns}>
				<Loader.Simple {...others} />
				<Text
					size={"sm"}
					align={"center"}
					weight={600}
				>
					{children}
				</Text>
			</td>
		</tr>
	);
};
