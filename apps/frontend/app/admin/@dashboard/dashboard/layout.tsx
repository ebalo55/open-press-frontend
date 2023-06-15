"use client";


import { INJECTION_TOKENS, ReactChildren } from "@open-press/frontend-interfaces";
import { AppShell } from "@mantine/core";
import {useSafeInject} from "@open-press/hooks";

export default function Layout(
    {
        children,
    }: ReactChildren,
): JSX.Element {
    const navbar = useSafeInject<JSX.Element>(INJECTION_TOKENS.components.dashboard.navbar)
    const footer = useSafeInject<JSX.Element>(INJECTION_TOKENS.components.dashboard.footer)
    const header = useSafeInject<JSX.Element>(INJECTION_TOKENS.components.dashboard.header)
    const sidebar = useSafeInject<JSX.Element>(INJECTION_TOKENS.components.dashboard.sidebar)

    return (
        <AppShell
            navbar={navbar}
            footer={footer}
            header={header}
            aside={sidebar}
        >
            {children}
        </AppShell>
    );
}
