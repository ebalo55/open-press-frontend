import { EventHandler, KeyboardEvent, RefObject } from "react";

/**
 * Submit form on keydown enter
 * @param {React.RefObject<HTMLFormElement>} form - Form to submit
 * @returns {{onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void}} - Event handler to attach to input
 */
export const useSubmitOnKeydownEnter = (form: RefObject<HTMLFormElement>) => {
	const handleKeyDown: EventHandler<KeyboardEvent<HTMLInputElement>> = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			console.log("submitting form", form, form.current);
			event.preventDefault();
			form.current?.submit();
		}
	};

	return { onKeyDown: handleKeyDown };
};
