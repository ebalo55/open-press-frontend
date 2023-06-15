"use client";
import { INJECTION_TOKENS } from "@open-press/frontend-interfaces";
import { useInject } from "@open-press/hooks";
import { FC } from "react";

export const DashboardBase: FC = () => {
	const { Card } = useInject<{ Card: FC }>(INJECTION_TOKENS.components.templates);

	return <Card />;
};
