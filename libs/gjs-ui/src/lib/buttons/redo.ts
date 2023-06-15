import { Button } from "grapesjs";

export const RedoButton: Button = {
	id: "redo",
	active: false,
	label: `<i class="ti ti-arrow-forward-up"></i>`,
	command: "core:redo",
} as Button & { label: string };
