"use client";

import { useInject, useSafeInject } from "@open-press/hooks";
import { INJECTION_TOKENS } from "@open-press/interfaces";
import { ReactNode, Suspense } from "react";

export default function Layout({ dashboard, login }: { dashboard: ReactNode; login: ReactNode }): JSX.Element {
	// Inject the user instance from the container this may be undefined if the user is not logged in
	const user = useSafeInject(INJECTION_TOKENS.instances.user);

	// Inject the login component from the container
	const Login = useInject(INJECTION_TOKENS.components.login);

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
				<Suspense fallback={<div>Loading...</div>}>
					<Login.Footer />
				</Suspense>
			</footer>
		</>
	);
}
