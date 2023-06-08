import { CONFIG } from "@frontend/config";
import { ReactChildren } from "@open-press/interfaces";

import "@tabler/icons-webfont/tabler-icons.min.css";
import { Metadata } from "next";

import { Providers } from "./providers";

export const metadata: Metadata = {
	title: `Welcome to ${CONFIG.app_name}`,
	description: "Generated with ❤️ by Open Press",
};

export default function RootLayout({ children }: ReactChildren): JSX.Element {
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
