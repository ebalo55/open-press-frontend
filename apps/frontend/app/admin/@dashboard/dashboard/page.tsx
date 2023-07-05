import { DashboardBase } from "@aetheria/frontend-common";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default function Dashboard() {
	return <DashboardBase />;
}
