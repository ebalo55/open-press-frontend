import { ConfigInterface } from "@aetheria/frontend-interfaces";

export const CONFIG: ConfigInterface = {
	app_name: process.env.NEXT_PUBLIC_APP_NAME,
	public_backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
	ssr_backend_url: process.env.NEXT_PUBLIC_SSR_BACKEND_URL,
};
