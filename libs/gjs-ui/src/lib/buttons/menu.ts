import { Button } from "grapesjs";
import { MENU, UiCommandNames } from "../commands";

export const MenuButton: Button = {
	id: "menu",
	active: false,
	label: `<i class="ti ti-menu-2"></i>`,
	command: MENU,
} as Button & { label: string; command: UiCommandNames };
