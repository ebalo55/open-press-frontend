"use client";

import { CONFIG } from "@aetheria/frontend-common";
import { INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { asValue } from "awilix";
import { UiPlugin } from "./lib/plugin";

export * from "./lib/plugin";
export * from "./lib/storage";
export * from "./lib/buttons";
export * from "./lib/devices";
export * from "./lib/panels";
export * from "./lib/commands";
export * from "./lib/traits";

export function GjsUIPluginLoader() {
	setTimeout(() => {
		if (!CONFIG.ioc) {
			throw new Error("IOC container not found");
		}

		console.log("Registering GJS UI plugin");

		CONFIG.ioc.register(
			INJECTION_TOKENS.instances.gjs_plugins,
			asValue([
				...(CONFIG.ioc.resolve(INJECTION_TOKENS.instances.gjs_plugins, { allowUnregistered: true }) || []),
				UiPlugin,
			])
		);
	}, 500);
}

GjsUIPluginLoader();
