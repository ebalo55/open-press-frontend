import { DEVICE_DESKTOP } from "../devices";
import { makeSetDeviceCommand } from "./set-device-factory";

export const SetDeviceDesktopCommand = makeSetDeviceCommand(DEVICE_DESKTOP);
