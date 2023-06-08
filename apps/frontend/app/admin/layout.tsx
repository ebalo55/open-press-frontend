import { Login } from "@open-press/components";
import { ReactNode } from "react";

export default function Layout({ dashboard, login }: { dashboard: ReactNode; login: ReactNode }): JSX.Element {
	/* const user = {
	 email: "john.doe@example.com",
	 };*/

	const user = null;

	return (
		<>
			<main
				style={{
					width: "100dvw",
					height: "95dvh",
				}}
			>
				{user ? dashboard : login}
			</main>
			<footer
				style={{
					width: "100dvw",
					height: "5dvh",
				}}
			>
				<Login.Footer />
			</footer>
		</>
	);
}
