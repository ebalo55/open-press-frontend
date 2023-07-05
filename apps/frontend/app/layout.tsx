import { CONFIG } from "@aetheria/frontend-common";
import { ReactChildren } from "@aetheria/frontend-interfaces";

import "@tabler/icons-webfont/tabler-icons.min.css";
import { Metadata } from "next";

import "./globals.css";

import { Providers } from "./providers";

export const metadata: Metadata = {
	title: `Welcome to ${CONFIG.app_name}`,
	description: "Created by Override",
};

export default function RootLayout({ children }: ReactChildren) {
	return (
		<html lang="en">
			<body
				style={{
					width: "100dvw",
					height: "100dvh",
				}}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
