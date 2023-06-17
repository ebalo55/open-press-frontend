import { Button } from "grapesjs";
import { SET_DEVICE_DESKTOP, UiCommandNames } from "../commands";

export const DeviceDesktopButton: Button = {
	id: "device-desktop",
	label: `<i class="ti ti-device-desktop"></i>`,
	command: SET_DEVICE_DESKTOP,
	active: true,
	togglable: false,
} as Button & { label: string; command: UiCommandNames };
