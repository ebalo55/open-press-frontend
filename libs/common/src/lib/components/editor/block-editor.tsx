"use client";

import { BlockEditorProps, INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { LoaderProps, Overlay, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import grapesjs, { Editor, ProjectData } from "grapesjs";

import "grapesjs/dist/css/grapes.min.css";
import "grapick/dist/grapick.min.css";
import { debounce } from "lodash";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useInject, useSafeInject, useTemplates } from "../../hooks";
import "./editor.css";
import { Menu } from "./menu";

/**
 * @description Debounced auto-save function for 5 seconds
 * @type {DebouncedFunc<(editor: Editor) => Promise<void>>} debounced function
 */
const debounced_autosave = debounce(async (editor: Editor, template_name: string, bearer: string) => {
	const btn: HTMLElement | null = document.querySelector("#saving-btn");
	if (btn) {
		btn.style.display = "flex";
	}

	// sleep for one second to show the saving button
	await new Promise((resolve) => setTimeout(resolve, 1000));

	await editor.store({});

	// revalidate the template
	await axios.post(
		`/api/revalidate`,
		{
			tag: template_name.replace(/\//g, "%2F"),
		},
		{
			headers: {
				Authorization: `Bearer ${bearer}`,
			},
		}
	);

	// sleep for one second to show the saving button
	await new Promise((resolve) => setTimeout(resolve, 1000));

	if (btn) {
		btn.style.display = "none";
	}
}, 2_500);

const debounced_reload_plugins = debounce((editor: Editor, set_editor: Dispatch<SetStateAction<Editor | null>>) => {
	editor.destroy();
	set_editor(null);
}, 2_500);

export const BlockEditor: FC<BlockEditorProps> = ({ id }) => {
	const bearer = useInject(INJECTION_TOKENS.instances.authentication_token) || "";
	const gjs_plugins = useSafeInject(INJECTION_TOKENS.instances.gjs_plugins) || [];
	const gjs_plugins_opts = useSafeInject(INJECTION_TOKENS.instances.gjs_plugin_opts) || [];

	const [editor, set_editor] = useState<Editor | null>(null);
	const [template_name, set_template_name] = useState<string | null>(null);

	const [is_reloading_plugins, { open: open_plugin_reloading_modal, close: close_plugin_reloading_modal }] =
		useDisclosure(false);

	const { Simple: SimpleLoader } = useInject<{ Simple: FC<LoaderProps> }>(INJECTION_TOKENS.components.loaders);

	const { data: template_data } = useTemplates(id).query.get;

	useEffect(() => {
		set_template_name((prevState) => {
			const new_template_name = template_data?.data.name || prevState || null;

			if (editor) {
				const old_update_event = () => {
					debounced_autosave(editor, prevState || "", bearer);
				};
				const update_event = () => {
					debounced_autosave(editor, new_template_name || "", bearer);
				};

				editor.off("update", old_update_event);
				editor.on("update", update_event);
			}

			return new_template_name;
		});
	}, [bearer, editor, template_data]);

	useEffect(() => {
		if (!editor) {
			const g_editor = grapesjs.init({
				// Indicate where to init the editor. You can also pass an HTMLElement
				container: "#gjs",
				// Size of the editor
				height: "calc(100vh - 3rem)", // full page - .panel__top, if the second changes, this
				// should change too
				width: "auto",
				plugins: gjs_plugins,
				pluginsOpts: gjs_plugins_opts,
				canvas: {
					scripts: ["https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"],
					styles: ["https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"],
				},
				blockManager: {
					appendTo: ".blocks-container",
				},
				layerManager: {
					appendTo: ".layers-container",
				},
				selectorManager: {
					appendTo: ".styles-container",
					componentFirst: true,
					escapeName: (name) => name,
				},
				traitManager: {
					appendTo: ".traits-container",
				},
				styleManager: {
					appendTo: ".styles-container",
				},
				optsCss: {
					clearStyles: true,
				},
				protectedCss: `
                     .container-component:not(:has(> *))::after {
                     content: "+";
                    
                     display: flex;
                     justify-content: center;
                     align-items: center;
                    
                     font-size: 2rem;
                     color: #ccc;
                     height: 100%;
                     }
                `,
				storageManager: {
					type: "remote",
					options: {
						remote: {
							id,
							bearer,
							onStore: (data: ProjectData, editor: Editor) => {
								const rendered_pages = editor.Pages.getAll().map((page) => {
									const component = page.getMainComponent();
									return {
										html: editor.getHtml({
											cleanId: true,
											component,
										}),
										css: editor.getCss({
											component,
											avoidProtected: true,
											clearStyles: true,
										}),
									};
								});

								return {
									data,
									rendered_pages,
								};
							},
						} as any,
					},
					autoload: true,
				},
			});

			set_editor(g_editor);
			close_plugin_reloading_modal();
		}

		if (editor && (editor.Config.plugins !== gjs_plugins || editor.Config.pluginsOpts !== gjs_plugins_opts)) {
			open_plugin_reloading_modal();
			debounced_reload_plugins(editor, set_editor);
		}
	}, [
		bearer,
		close_plugin_reloading_modal,
		editor,
		gjs_plugins,
		gjs_plugins_opts,
		id,
		open_plugin_reloading_modal,
		template_name,
	]);

	return (
		<div className={"editor"}>
			{is_reloading_plugins && (
				<Overlay
					center
					blur={5}
				>
					<Stack
						align={"center"}
						justify={"center"}
						spacing={"sm"}
					>
						<SimpleLoader />
						<Title color={"gray.1"}>Loading plugins</Title>
						<Text color={"gray.1"}>
							Please wait while the plugins are being loaded. This may take a few seconds.
						</Text>
					</Stack>
				</Overlay>
			)}
			<div className={"panel__top"}>
				<div className={"panel__switcher"}></div>
				<div className={"panel__devices"}></div>
				<div className={"panel__basic-actions"}></div>
			</div>
			<div className={"editor-row"}>
				<div className={"panel__left"}>
					<div
						className={"layers-container"}
						style={{ display: "none" }}
					></div>
					<div
						className={"styles-container"}
						style={{ display: "none" }}
					></div>
					<div
						className={"traits-container"}
						style={{ display: "none" }}
					></div>
					<div className={"blocks-container"}></div>
					<Menu id={id} />
				</div>
				<div className={"editor-canvas"}>
					<div id={"gjs"}></div>
				</div>
			</div>
		</div>
	);
};
