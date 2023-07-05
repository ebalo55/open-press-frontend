import { CommandObject } from "grapesjs";

export const BackHomeCommand: CommandObject = {
	run: (editor) => {
		window.location.href = "/admin/dashboard";
	},
};
