"use client";

import { DataTableBodyProps, INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { Card as MantineCard, Table } from "@mantine/core";
import { FC, useMemo } from "react";
import { useInject, useTemplates } from "../../hooks";
import { safeValidate, ValidStatusCodeSchema } from "../../utility/validation";

export const Card: FC = () => {
	const { CardHeader, DataTableHeader, DataTableBody, DataTableBodyLoading } = useInject<{
		CardHeader: FC;
		DataTableHeader: FC;
		DataTableBodyLoading: FC;
		DataTableBody: FC<DataTableBodyProps>;
	}>(INJECTION_TOKENS.components.templates);

	const { data, error, isLoading, isValidating } = useTemplates().query.listing;

	const has_data = useMemo(
		() =>
			!error &&
			!isLoading &&
			!isValidating &&
			data &&
			safeValidate(data.status, ValidStatusCodeSchema) &&
			data.data.length > 0,
		[data, error, isLoading, isValidating]
	);

	return (
		<MantineCard
			shadow={"lg"}
			withBorder
		>
			<CardHeader />
			<Table
				withColumnBorders={has_data}
				verticalSpacing={"md"}
				mt={"xl"}
			>
				<DataTableHeader />
				<tbody>{!has_data || !data ? <DataTableBodyLoading /> : <DataTableBody data={data.data} />}</tbody>
			</Table>
		</MantineCard>
	);
};
