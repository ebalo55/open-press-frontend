import { relativePath } from "./relative-path";

/* eslint-disable-next-line */
export interface PluginExampleFrontendProps {}

export default function Page(props: PluginExampleFrontendProps) {
	return (
		<div>
			<h1>Welcome to PluginExampleFrontend!</h1>
			<p>This is a relative path {relativePath}</p>
		</div>
	);
}
