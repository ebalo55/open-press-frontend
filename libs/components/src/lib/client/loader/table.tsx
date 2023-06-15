"use client";

import { LoaderProps, Text } from "@mantine/core";
import { INJECTION_TOKENS, TableLoaderProps } from "@open-press/frontend-interfaces";
import { useInject } from "@open-press/hooks";
import { FC } from "react";

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
