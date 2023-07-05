import { LoginBase } from "@aetheria/frontend-common";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
};

export default function Page() {
	return <LoginBase />;
}
