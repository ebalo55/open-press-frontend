import {
	Editor,
	PropertyCompositeProps,
	PropertyNumberProps,
	PropertyProps,
	PropertySelectProps,
	PropValues,
	StyleProps,
} from "grapesjs";
import {
	BACK_HOME,
	BackHomeCommand,
	IMPORT_CODE,
	MENU,
	MenuCommand,
	OpenImportCodeModal,
	SET_DEVICE_DESKTOP,
	SET_DEVICE_MOBILE,
	SetDeviceDesktopCommand,
	SetDeviceMobileCommand,
	SHOW_BLOCKS,
	SHOW_LAYERS,
	SHOW_STYLES,
	SHOW_TRAITS,
	ShowBlocksCommand,
	ShowLayersCommand,
	ShowStylesCommand,
	ShowTraitsCommand,
} from "./commands";
import { DeviceDesktop, DeviceMobile } from "./devices";
import { BasicActions, DevicesPanel, PanelSwitcherPanel, ResizableLayersPanel, TopPanel } from "./panels";
import { CustomRemoteStorage } from "./storage";
import {
	TRAIT_HORIZONTAL_SEPARATOR,
	TRAIT_SECTION_HEADER,
	TraitHorizontalSeparator,
	TraitSectionHeader,
} from "./traits";

export const UiPlugin = (editor: Editor) => {
	editor.Panels.getPanels().reset([TopPanel, BasicActions, ResizableLayersPanel, PanelSwitcherPanel, DevicesPanel]);

	editor.Devices.devices.reset([DeviceDesktop, DeviceMobile]);

	const ui_commands = [
		{
			id: SHOW_LAYERS,
			command: ShowLayersCommand,
		},
		{
			id: SHOW_TRAITS,
			command: ShowTraitsCommand,
		},
		{
			id: SHOW_STYLES,
			command: ShowStylesCommand,
		},
		{
			id: SHOW_BLOCKS,
			command: ShowBlocksCommand,
		},
		{
			id: SET_DEVICE_DESKTOP,
			command: SetDeviceDesktopCommand,
		},
		{
			id: SET_DEVICE_MOBILE,
			command: SetDeviceMobileCommand,
		},
		{
			id: IMPORT_CODE,
			command: OpenImportCodeModal,
		},
		{
			id: BACK_HOME,
			command: BackHomeCommand,
		},
		{
			id: MENU,
			command: MenuCommand,
		},
	];
	ui_commands.forEach(({ id, command }) => {
		editor.Commands.add(id, command);
	});

	const ui_traits = [
		{
			id: TRAIT_SECTION_HEADER,
			trait: TraitSectionHeader,
		},
		{
			id: TRAIT_HORIZONTAL_SEPARATOR,
			trait: TraitHorizontalSeparator,
		},
	];
	ui_traits.forEach(({ id, trait }) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		editor.Traits.addType(id, trait);
	});

	editor.Storage.add("remote", CustomRemoteStorage);

	editor.onReady(() => {
		editor.Styles.getSector("general").addProperty(
			{
				type: "number",
				default: "0",
				name: "z-index",
				property: "z-index",
				min: 0,
			} as PropertyNumberProps,
			{}
		);
		editor.Styles.getSector("general").addProperty(
			{
				type: "number",
				default: "0",
				name: "gap",
				property: "gap",
				label: "Gap",
				units: ["px", "%", "em", "rem", "vh", "vw"],
				min: 0,
			} as PropertyNumberProps,
			{}
		);
		editor.Styles.getSector("general").addProperty(
			{
				type: "composite",
				name: "Grid template columns",
				id: "grid-template-columns",
				property: "grid-template-columns",
				label: "Grid template columns",
				/* requires: {
				 display: "grid",
				 }, */
				properties: [
					{
						type: "select",
						id: "type",
						name: "Type",
						options: [
							{
								id: "repeat",
								label: "repeat",
							},
							{
								id: "custom",
								label: "custom",
							},
						],
						default: "repeat",
					} as PropertySelectProps,
					{
						type: "number",
						id: "repetition",
						name: "Repetition",
						requires: {
							type: "repeat",
						},
						default: "1",
						min: 1,
					} as PropertyNumberProps,
					{
						type: "number",
						id: "value",
						name: "Value",
						default: "1fr",
						units: ["fr", "px", "%", "em", "rem", "vh", "vw"],
					} as PropertyNumberProps,
					{
						type: "base",
						id: "custom-value",
						name: "Value",
						default: "1fr 50px 1fr",
					} as PropertyProps,
				],
				separator: " ",
				toStyle: (values, data): StyleProps => {
					if (values.type === "custom") {
						return {
							[data.name]: values["custom-value"].replace(/repeat\((.+)\)/, "$1"),
						};
					} else {
						return {
							[data.name]: `repeat(${values["repetition"]}, ${values["value"]})`,
						};
					}
				},
				fromStyle: (style, data): PropValues => {
					if (data.name in style) {
						const style_value = style[data.name];

						if (style_value.startsWith("repeat")) {
							const [repetition, value] = style_value.replace("repeat(", "").replace(")", "").split(",");

							return {
								type: "repeat",
								repetition,
								value,
								"custom-value": "1fr 50px 1fr",
							};
						} else {
							return {
								type: "custom",
								repetition: "1",
								value: "1fr",
								"custom-value": style_value,
							};
						}
					}

					return {
						type: "repeat",
						repetition: "1",
						value: "1fr",
						"custom-value": "1fr 50px 1fr",
					};
				},
			} as PropertyCompositeProps,
			{}
		);

		(editor.Styles.getProperty("general", "display") as any).addOption({
			id: "grid",
			label: "grid",
		});
	});
};
