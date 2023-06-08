"use client";

import { ColorScheme, ColorSchemeProvider, Global, MantineProvider, Paper } from "@mantine/core";
import { nunito } from "@open-press/components/server";
import { ReactChildren } from "@open-press/interfaces";
import { useState } from "react";

export function Providers({ children }: ReactChildren) {
	const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	return (
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
						backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
					})}
				>
					{children}
				</Paper>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
