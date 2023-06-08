import { ComponentDefinition } from "grapesjs";

export interface ComponentAttributeChangeHandlerOptions {
	init?: boolean;
	stop_propagation?: boolean;
	idUpdate?: boolean;
}

export type ComponentAttributeChangeHandler = (
	component: ComponentDefinition,
	value: string,
	options: ComponentAttributeChangeHandlerOptions,
) => void;
