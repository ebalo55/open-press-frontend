import { Button } from "grapesjs";

export const FullscreenButton: Button = {
	id: "fullscreen",
	active: false,
	label: `<i class="ti ti-maximize"></i>`,
	command: "core:fullscreen",
} as Button & { label: string };
