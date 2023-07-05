"use client";

import { INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { Card as MantineCard } from "@mantine/core";
import { FC } from "react";
import { useInject } from "../../hooks";

export const Card: FC = () => {
	const { CardHeader, Form } = useInject<{ CardHeader: FC; Form: FC }>(INJECTION_TOKENS.components.login);

	return (
		<MantineCard
			withBorder
			shadow={"xl"}
			p={"xl"}
			sx={{
				transform: "translateY(-40%)",
			}}
			w={"24rem"}
		>
			<CardHeader />
			<Form />
		</MantineCard>
	);
};
