"use client";

import { BaseBlocksPlugin, makeBlockLabel } from "@open-press/gjs-base-blocks";
import { UiPlugin } from "@open-press/gjs-ui";
import grapesjs, { Editor } from "grapesjs";
import GjsStyleBgPlugin from "grapesjs-style-bg";
import GjsStyleGradientPlugin from "grapesjs-style-gradient";
import GjsTuiImageEditorPlugin from "grapesjs-tui-image-editor";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GjsTypedPlugin from "grapesjs-typed";

import "grapesjs/dist/css/grapes.min.css";
import "grapick/dist/grapick.min.css";
import { FC, useEffect, useState } from "react";
import "./editor.css";

export const BlockEditor: FC = () => {
	const [editor, set_editor] = useState<Editor | null>(null);

	useEffect(() => {
		if (!editor) {
			set_editor(
				grapesjs.init({
					// Indicate where to init the editor. You can also pass an HTMLElement
					container: "#gjs",
					fromElement: true,
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
				})
			);
		}
	}, [editor]);

	/*if (editor) {
	 console.log("html", editor.getHtml({cleanId: true}));
	 console.log("css", editor.getCss({avoidProtected: true, clearStyles: true}));
	 console.log("js", editor.getJs());
	 }
	 */

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
				</div>
				<div className={"editor-canvas"}>
					<div id={"gjs"}></div>
				</div>
			</div>
		</div>
	);
};
