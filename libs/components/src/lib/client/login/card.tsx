"use client";

import { Card as MantineCard } from "@mantine/core";
import { INJECTION_TOKENS } from "@open-press/frontend-interfaces";
import { useInject } from "@open-press/hooks";
import { FC } from "react";

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
