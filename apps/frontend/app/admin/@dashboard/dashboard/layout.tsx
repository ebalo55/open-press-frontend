"use client";

import { INJECTION_TOKENS, ReactChildren } from "@aetheria/frontend-interfaces";
import { useSafeInject } from "@aetheria/hooks";
import { AppShell } from "@mantine/core";
import { FC } from "react";

export default function Layout({ children }: ReactChildren) {
	const Navbar = useSafeInject<FC>(INJECTION_TOKENS.components.dashboard.navbar);
	const Footer = useSafeInject<FC>(INJECTION_TOKENS.components.dashboard.footer);
	const Header = useSafeInject<FC>(INJECTION_TOKENS.components.dashboard.header);
	const Sidebar = useSafeInject<FC>(INJECTION_TOKENS.components.dashboard.sidebar);

	return (
		<AppShell
			navbar={Navbar && <Navbar />}
			footer={Footer && <Footer />}
			header={Header && <Header />}
			aside={Sidebar && <Sidebar />}
		>
			{children}
		</AppShell>
	);
}
