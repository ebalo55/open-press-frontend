import classNames from "classnames";
import { ITraitView } from "grapesjs";

export const TraitSectionHeader: ITraitView = {
	noLabel: true,
	templateInput({ trait, component, elInput }): string {
		return "";
	},
	createInput({ trait, component, elInput }): string | HTMLElement {
		// Load the label from the trait definition object or use the name property, if none is defined use "Section
		// Header"
		const label = trait.get("label") || trait.get("name") || "Section Header";

		const element = document.createElement("div");
		element.classList.add(...classNames("flex items-center font-semibold mt-2"));
		element.innerText = label;

		return element;
	},
};