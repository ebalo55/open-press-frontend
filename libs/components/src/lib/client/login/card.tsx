"use client";

import { Card as MantineCard } from "@mantine/core";
import { FC } from "react";
import { CardHeader } from "./card-header";
import { Form } from "./form";

export const Card: FC = () => {
	return (
		<MantineCard
			withBorder
			shadow={"xl"}
			p={"xl"}
			sx={{
				transform: "translateY(-50%)",
			}}
			w={"24rem"}
		>
			<CardHeader />
			<Form />
		</MantineCard>
	);
};
