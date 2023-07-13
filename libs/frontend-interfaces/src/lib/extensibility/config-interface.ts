import { AwilixContainer } from "awilix";

export interface ConfigInterface {
	app_name?: string;
	public_backend_url?: string;
	ssr_backend_url?: string;
	ioc?: AwilixContainer;
}
