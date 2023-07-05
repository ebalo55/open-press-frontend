"use client";

import { INJECTION_TOKENS, TableLoaderProps } from "@aetheria/frontend-interfaces";
import { FC } from "react";
import { useInject } from "../../hooks";

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
