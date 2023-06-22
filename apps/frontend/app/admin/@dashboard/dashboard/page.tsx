import { DashboardBase } from "@aetheria/components";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default function Dashboard(): JSX.Element {
	return <DashboardBase />;
}
