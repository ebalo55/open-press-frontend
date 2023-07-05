// NOTE: Each plugin must be imported here to be available in the frontend app.
//  Each line **MUST** end with a comma
export const injectable = [
	import("@aetheria/frontend-common"),
	import("@aetheria/gjs-ui"),
	import("@aetheria/gjs-base-blocks"),
];
