import { Button } from "grapesjs";

export const ViewComponentsButton: Button = {
	id: "visibility",
	active: true,
	className: "btn-toggle-borders",
	label: `<i class="ti ti-border-none"></i>`,
	command: "sw-visibility",
} as Button & { label: string };
