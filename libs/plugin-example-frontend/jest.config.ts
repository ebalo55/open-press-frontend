/* eslint-disable */
export default {
	displayName: "plugin-example-frontend",
	preset: "../../jest.preset.js",
	transform: {
		"^.+\\.[tj]sx?$": ["@swc/jest", { jsc: { transform: { react: { runtime: "automatic" } } } }],
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	coverageDirectory: "../../coverage/libs/plugin-example-frontend",
};
