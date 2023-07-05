import { AdminBase } from "@aetheria/frontend-common";
import { AdminBaseComponentProperties } from "@aetheria/frontend-interfaces";

export default function Layout({ dashboard, login }: AdminBaseComponentProperties) {
	return (
		<AdminBase
			dashboard={dashboard}
			login={login}
		/>
	);
}
