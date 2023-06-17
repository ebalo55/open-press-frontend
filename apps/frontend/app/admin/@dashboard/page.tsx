"use client";
import { INJECTION_TOKENS } from "@open-press/frontend-interfaces";
import { useInject, useSafeInject } from "@open-press/hooks";
import { useRouter } from "next/navigation";
import { FC, Suspense, useEffect } from "react";

export default function Loading(): JSX.Element {
	const router = useRouter();

	const Loaders = useInject<{ FullPage: FC }>(INJECTION_TOKENS.components.loaders);
	const initial_navigation_url = useSafeInject<string>(INJECTION_TOKENS.instances.initial_navigation_url);

	useEffect(() => {
		router.push(initial_navigation_url ?? "/admin/dashboard");
	});

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Loaders.FullPage />
		</Suspense>
	);
}
