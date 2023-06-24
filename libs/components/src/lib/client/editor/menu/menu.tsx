"use client";

import { BlockEditorProps, INJECTION_TOKENS, NullableHTMLElement } from "@aetheria/frontend-interfaces";
import { useInject } from "@aetheria/hooks";
import { Drawer, MantineProvider, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useCallback, useEffect } from "react";

export const Menu: FC<BlockEditorProps> = ({ id }) => {
	const { GeneralContent } = useInject<{ GeneralContent: FC<BlockEditorProps> }>(INJECTION_TOKENS.components.editor);

	const [opened, { open, close }] = useDisclosure(false);

	const wrapped_close = useCallback(() => {
		const node: NullableHTMLElement = document.querySelector(".menu-container");

		if (!node) {
			console.error("Could not find menu container");
			return;
		}

		node.dataset.visible = "false";

		close();
	}, [close]);

	useEffect(() => {
		const node: NullableHTMLElement = document.querySelector(".menu-container");

		if (!node) {
			console.error("Could not find menu container");
			return;
		}

		const observer = new MutationObserver((mutations, observer) => {
			if (mutations.length === 1 && mutations[0].attributeName === "data-visible") {
				const visible = node.getAttribute("data-visible") === "true";
				if (visible) {
					open();
				}
			}
		});

		observer.observe(node, {
			attributes: true,
			attributeFilter: ["data-visible"],
		});

		return () => {
			observer.disconnect();
		};
	}, [open, wrapped_close]);

	// force mantine to use dark mode only for this component
	return (
		<MantineProvider theme={{ colorScheme: "dark" }}>
			<div className={"menu-container"}>
				<Drawer
					opened={opened}
					onClose={wrapped_close}
					closeOnClickOutside
					title={"Menu"}
					scrollAreaComponent={ScrollArea.Autosize}
				>
					<GeneralContent id={id} />
				</Drawer>
			</div>
		</MantineProvider>
	);
};
