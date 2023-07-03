import { CommandObject } from "grapesjs";
import { DeviceName } from "../devices";

export const makeSetDeviceCommand = (device: DeviceName): CommandObject => {
	return {
		run: (editor) => {
			editor.setDevice(device);
		},
	};
};
