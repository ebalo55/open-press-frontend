import { Button } from "grapesjs";
import { BACK_HOME, UiCommandNames } from "../commands";

export const HomeButton: Button = {
	id: BACK_HOME,
	label: `<i class="ti ti-arrow-left"></i>`,
	command: BACK_HOME,
	togglable: false,
} as Button & { label: string; command: UiCommandNames };
