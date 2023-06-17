"use client";

import { AdminBaseComponentProperties, INJECTION_TOKENS } from "@open-press/frontend-interfaces";
import { useInject, useIoc, useUser } from "@open-press/hooks";
import { asValue } from "awilix";
import { FC, Suspense, useEffect } from "react";

export const AdminBase: FC<AdminBaseComponentProperties> = ({ dashboard, login }) => {
	// Inject the user instance from the container this may be undefined if the user is not logged in
	const { user } = useUser();

	// Inject the login component from the container
	const Login = useInject(INJECTION_TOKENS.components.login);
	const IOC = useIoc();

	// Register the initial navigation url in the container so that the login component can redirect to it
	// after a successful login
	useEffect(() => {
		IOC.register(INJECTION_TOKENS.instances.initial_navigation_url, asValue(window.location.href));
	}, []);

	return (
		<>
			{user ? (
				dashboard
			) : (
				<>
					<main
						style={{
							width: "100dvw",
							height: "95dvh",
						}}
					>
						{login}
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
			)}
		</>
	);
};
