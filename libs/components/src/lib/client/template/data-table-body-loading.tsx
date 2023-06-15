"use client";

import { INJECTION_TOKENS, TableLoaderProps } from "@open-press/frontend-interfaces";
import { useInject } from "@open-press/hooks";
import { FC } from "react";

export const DataTableBodyLoading: FC = () => {
	const Loader = useInject<{ Table: FC<TableLoaderProps> }>(INJECTION_TOKENS.components.loaders);

	return (
		<Loader.Table
			columns={4}
			size={"xl"}
			my={"xl"}
		>
			Loading templates...
		</Loader.Table>
	);
};
