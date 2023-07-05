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
		element.style.display = "flex";
		element.style.alignItems = "center";
		element.style.fontWeight = "600";
		element.style.marginTop = ".5rem";
		element.innerText = label;

		return element;
	},
};
