import { DashboardBase } from "@open-press/components";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default function Dashboard(): JSX.Element {
	return <DashboardBase />;
}
