import { TraitHorizontalSeparatorExtraSettings } from "@open-press/interfaces";
import classNames from "classnames";
import { ITraitView } from "grapesjs";

export const TraitHorizontalSeparator: ITraitView = {
	noLabel: true,
	templateInput({ trait, component, elInput }): string {
		return "";
	},
	createInput({ trait, component, elInput }): string | HTMLElement {
		const { additional_classes } = trait.get("default") as TraitHorizontalSeparatorExtraSettings;

		const element = document.createElement("hr");
		element.classList.add(...classNames("border border-gray-400"));

		if (additional_classes) {
			element.classList.add(...classNames(additional_classes));
		}

		return element;
	},
};