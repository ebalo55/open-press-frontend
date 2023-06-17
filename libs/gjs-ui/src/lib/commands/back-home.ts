import { CommandObject } from "grapesjs";

export const BackHomeCommand: CommandObject = {
	run: (editor) => {
		window.history.back();
	},
};
