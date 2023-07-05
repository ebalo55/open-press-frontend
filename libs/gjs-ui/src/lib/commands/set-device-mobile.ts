import { DEVICE_MOBILE } from "../devices";
import { makeSetDeviceCommand } from "./set-device-factory";

export const SetDeviceMobileCommand = makeSetDeviceCommand(DEVICE_MOBILE);
