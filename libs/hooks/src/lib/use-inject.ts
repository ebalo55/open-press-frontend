import { useIoc } from "./use-ioc";

export const useInject = <T = any>(identifier: string): T => {
	const container = useIoc();
	console.log("container", container.registrations);

	return container.resolve(identifier) as T;
};
