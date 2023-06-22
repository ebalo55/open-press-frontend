"use client";
import { INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { useInject, useSafeInject } from "@aetheria/hooks";
import { useRouter } from "next/navigation";
import { FC, Suspense, useEffect } from "react";

export default function Loading(): JSX.Element {
	const router = useRouter();

	const Loaders = useInject<{ FullPage: FC }>(INJECTION_TOKENS.components.loaders);
	const initial_navigation_url = useSafeInject<string>(INJECTION_TOKENS.instances.initial_navigation_url);

	useEffect(() => {
		if (initial_navigation_url && !initial_navigation_url.endsWith("/admin")) {
			router.push(initial_navigation_url);
			return;
		}

		router.push("/admin/dashboard");
	});

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Loaders.FullPage />
		</Suspense>
	);
}
