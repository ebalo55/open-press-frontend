"use client";
import { INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { FC } from "react";
import { useInject } from "../../hooks";

export const DashboardBase: FC = () => {
	const { Card } = useInject<{ Card: FC }>(INJECTION_TOKENS.components.templates);

	return <Card />;
};
