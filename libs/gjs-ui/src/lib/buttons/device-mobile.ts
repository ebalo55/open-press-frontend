import { Button } from "grapesjs";
import { SET_DEVICE_MOBILE, UiCommandNames } from "../commands";

export const DeviceMobileButton: Button = {
	id: "device-mobile",
	label: `<i class="ti ti-device-mobile"></i>`,
	command: SET_DEVICE_MOBILE,
	active: false,
	togglable: false,
} as Button & { label: string; command: UiCommandNames };
