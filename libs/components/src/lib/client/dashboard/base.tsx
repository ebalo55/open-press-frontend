"use client";
import { INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { useInject } from "@aetheria/hooks";
import { FC } from "react";

export const DashboardBase: FC = () => {
	const { Card } = useInject<{ Card: FC }>(INJECTION_TOKENS.components.templates);

	return <Card />;
};
