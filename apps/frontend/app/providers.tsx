"use client";

import {ColorScheme, ColorSchemeProvider, Global, MantineProvider, Paper} from "@mantine/core";
import {nunito} from "@open-press/components/server";
import {IocProvider} from "@open-press/hooks";
import {INJECTION_TOKENS, ReactChildren} from "@open-press/interfaces";
import {asValue, AwilixContainer, createContainer} from "awilix";
import {Suspense, useEffect, useState} from "react";

/**
 * Register the authentication token from the session storage if present and no other token is present in the local storage
 * @param container The container to register the authentication token to
 */
function registerStoredAuthenticationToken(container: AwilixContainer) {
    const ss_authentication_token = window.sessionStorage.getItem(INJECTION_TOKENS.instances.authentication_token)
    const ls_authentication_token = window.localStorage.getItem(INJECTION_TOKENS.instances.authentication_token)

    // register session storage authentication token only if no other token is present in the local storage
    if (ss_authentication_token && !ls_authentication_token) {
        container.register(
            INJECTION_TOKENS.instances.authentication_token,
            asValue(JSON.parse(ss_authentication_token))
        )

        return;
    }

    // fallback to registering the local storage value if defined
    if (ls_authentication_token) {
        container.register(
            INJECTION_TOKENS.instances.authentication_token,
            asValue(JSON.parse(ls_authentication_token))
        )
    }
}

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

    registerStoredAuthenticationToken(container)

    return container;
}

export function Providers({children}: ReactChildren) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    const [container, setContainer] = useState<AwilixContainer | null>(null);

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
