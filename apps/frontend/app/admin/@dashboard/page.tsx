"use client";
import { useInject } from "@open-press/hooks";
import { INJECTION_TOKENS } from "@open-press/interfaces";
import { useRouter } from "next/navigation";
import { FC, Suspense, useEffect } from "react";

export default function Loading(): JSX.Element {
	const router = useRouter();

	const Loaders = useInject<{ FullPage: FC }>(INJECTION_TOKENS.components.loaders);

	useEffect(() => {
		router.push("/admin/dashboard");
	});

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Loaders.FullPage />
		</Suspense>
	);
}
