import { NullableHTMLElement } from "@aetheria/frontend-interfaces";
import { CommandObject, Editor } from "grapesjs";

type ShowCommandType = CommandObject & {
	getEditorRow(editor: Editor): HTMLElement;
	getElement(editor: Editor): HTMLElement;
};

const element_selector = ".menu-container";

export const MenuCommand: CommandObject = {
	getEditorRow(editor: Editor): HTMLElement {
		const row: NullableHTMLElement = editor.getContainer()?.closest(".editor-row") || null;

		if (!row) {
			throw new Error("Could not find editor row");
		}

		return row;
	},

	getElement(this: ShowCommandType, editor: Editor): HTMLElement {
		const row = this.getEditorRow(editor);
		const element: NullableHTMLElement = row.querySelector(element_selector);

		if (!element) {
			throw new Error(`Could not find "${element_selector}" element`);
		}

		return element;
	},

	run(this: ShowCommandType, editor, sender) {
		const element = this.getElement(editor);
		element.dataset.visible = "true";

		// preset the open screen when the drawer menu will be closed
		setTimeout(() => {
			const layers: NullableHTMLElement = document.querySelector(".layers-button");
			if (layers) {
				layers.click();
			}
		}, 500);
	},
};
