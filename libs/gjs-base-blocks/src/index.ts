"use client";

import { CONFIG } from "@aetheria/frontend-common";
import { INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { asValue } from "awilix";
import GjsStyleBgPlugin from "grapesjs-style-bg";
import GjsStyleGradientPlugin from "grapesjs-style-gradient";
import GjsTuiImageEditorPlugin from "grapesjs-tui-image-editor";
import GjsTypedPlugin from "grapesjs-typed";
import { makeBlockLabel } from "./lib/blocks";
import { BaseBlocksPlugin } from "./lib/plugin";

export * from "./lib/plugin";
export * from "./lib/blocks";
export * from "./lib/components";

export function GjsBaseBlocksPluginLoader() {
	setTimeout(() => {
		if (!CONFIG.ioc) {
			throw new Error("IOC container not found");
		}

		console.log("Registering GJS Base Blocks plugin");

		CONFIG.ioc.register(
			INJECTION_TOKENS.instances.gjs_plugins,
			asValue([
				...(CONFIG.ioc.resolve(INJECTION_TOKENS.instances.gjs_plugins, { allowUnregistered: true }) || []),
				BaseBlocksPlugin,
				GjsStyleBgPlugin,
				GjsStyleGradientPlugin,
				GjsTuiImageEditorPlugin,
				GjsTypedPlugin,
			])
		);

		CONFIG.ioc.register(
			INJECTION_TOKENS.instances.gjs_plugin_opts,
			asValue({
				...(CONFIG.ioc.resolve(INJECTION_TOKENS.instances.gjs_plugin_opts, { allowUnregistered: true }) || {}),
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				[GjsTypedPlugin]: {
					block: {
						label: makeBlockLabel("Animated text", "keyframes"),
						media: false,
						category: "Extra",
					},
				},
			})
		);
	}, 500);
}

GjsBaseBlocksPluginLoader();
