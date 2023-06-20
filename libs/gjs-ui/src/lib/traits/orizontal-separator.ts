import { TraitHorizontalSeparatorExtraSettings } from "@open-press/frontend-interfaces";
import { ITraitView } from "grapesjs";

export const TraitHorizontalSeparator: ITraitView = {
	noLabel: true,
	templateInput({ trait, component, elInput }): string {
		return "";
	},
	createInput({ trait, component, elInput }): string | HTMLElement {
		const { additional_classes } = trait.get("default") as TraitHorizontalSeparatorExtraSettings;

		const element = document.createElement("hr");
		element.style.border = "1px solid #9ca3af";

		if (additional_classes) {
			element.classList.add(...additional_classes.split(" "));
		}

		return element;
	},
};
