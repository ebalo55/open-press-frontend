"use client";

import { ColorScheme, ColorSchemeProvider, Global, MantineProvider, Paper } from "@mantine/core";
import { nunito } from "@open-press/components/server";
import { IocProvider } from "@open-press/hooks";
import { ReactChildren } from "@open-press/interfaces";
import { asValue, createContainer } from "awilix";
import { Suspense, useEffect, useState } from "react";

async function fillContainer() {
	const container = createContainer({
		injectionMode: "PROXY",
	});

	const modules = await Promise.all([
		import("@open-press/components"),
		import("@open-press/hooks"),
		import("@open-press/frontend-utility"),
	]);

	container.register(
		modules.reduce((accumulator: any, module) => {
			accumulator = {
				...accumulator,
				...Object.entries(module).reduce((acc: any, [key, value]) => {
					acc[key] = asValue(value);

					return acc;
				}, {}),
			};

			return accumulator;
		}, {})
	);

	/* container.register({
	 Login: asValue<typeof components_module.Login>(components_module.Login),
	 ...Object.entries(hooks_module).reduce((acc: any, [key, value]) => {
	 acc[key] = asValue(value);
	 return acc;
	 }, {}),
	 ...Object.entries(front_end_utility_module).reduce((acc: any, [key, value]) => {
	 acc[key] = asValue(value);
	 return acc;
	 }, {}),
	 }); */

	return container;
}

export function Providers({ children }: ReactChildren) {
	const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	const [container, setContainer] = useState<any>(null);

	useEffect(() => {
		fillContainer().then((container) => {
			setContainer(container);
		});
	}, []);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{container && (
				<IocProvider container={container}>
					<ColorSchemeProvider
						colorScheme={colorScheme}
						toggleColorScheme={toggleColorScheme}
					>
						<MantineProvider
							theme={{
								colorScheme,
								fontFamily: nunito.style.fontFamily,
							}}
							withGlobalStyles
							withNormalizeCSS
							withCSSVariables
						>
							<Global
								styles={(theme) => ({
									fontFamily: nunito.style.fontFamily,
								})}
							/>
							<Paper
								sx={(theme) => ({
									backgroundColor:
										theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
								})}
							>
								{children}
							</Paper>
						</MantineProvider>
					</ColorSchemeProvider>
				</IocProvider>
			)}
		</Suspense>
	);
}
