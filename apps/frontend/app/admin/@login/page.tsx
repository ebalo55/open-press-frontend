import { LoginBase } from "@aetheria/components";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
};

export default function Page() {
	return <LoginBase />;
}
