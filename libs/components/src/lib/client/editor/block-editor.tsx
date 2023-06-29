"use client";

import { BlockEditorProps, INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { BaseBlocksPlugin, makeBlockLabel } from "@aetheria/gjs-base-blocks";
import { UiPlugin } from "@aetheria/gjs-ui";
import { useInject, useTemplates } from "@aetheria/hooks";
import axios from "axios";
import grapesjs, { Editor, ProjectData } from "grapesjs";
import GjsStyleBgPlugin from "grapesjs-style-bg";
import GjsStyleGradientPlugin from "grapesjs-style-gradient";
import GjsTuiImageEditorPlugin from "grapesjs-tui-image-editor";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GjsTypedPlugin from "grapesjs-typed";

import "grapesjs/dist/css/grapes.min.css";
import "grapick/dist/grapick.min.css";
import { debounce } from "lodash";
import { FC, useEffect, useState } from "react";
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
		},
	);

	// sleep for one second to show the saving button
	await new Promise((resolve) => setTimeout(resolve, 1000));

	if (btn) {
		btn.style.display = "none";
	}
}, 2_500);

export const BlockEditor: FC<BlockEditorProps> = ({ id }) => {
	const bearer = useInject(INJECTION_TOKENS.instances.authentication_token) || "";

	const [editor, set_editor] = useState<Editor | null>(null);
	const [template_name, set_template_name] = useState<string | null>(null);

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
				plugins: [
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					UiPlugin,
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					BaseBlocksPlugin,
					GjsStyleBgPlugin,
					GjsStyleGradientPlugin,
					GjsTuiImageEditorPlugin,
					GjsTypedPlugin,
				],
				pluginsOpts: {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					[GjsTypedPlugin]: {
						block: {
							label: makeBlockLabel("Animated text", "keyframes"),
							media: false,
							category: "Extra",
						},
					},
				},
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
		}
	}, [bearer, editor, id, template_name]);

	return (
		<div className={"editor"}>
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
