import classNames from "classnames";
import { Editor } from "grapesjs";
import { makeBlockLabel } from "./label-factory";

export const LabelBlock = (editor: Editor) => {
	editor.Blocks.add("label", {
		label: makeBlockLabel("Label", "writing"),
		category: "Forms",
		content: {
			type: "label",
			content: "This is a label",
			classes: classNames("text-sm font-semibold"),
		},
	});
};
