import { LoginBase } from "@open-press/components";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
};

export default function Page(): JSX.Element {
	return <LoginBase />;
}
