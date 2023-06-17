import { AdminBase } from "@open-press/components";
import { AdminBaseComponentProperties } from "@open-press/frontend-interfaces";

export default function Layout({ dashboard, login }: AdminBaseComponentProperties): JSX.Element {
	return (
		<AdminBase
			dashboard={dashboard}
			login={login}
		/>
	);
}
