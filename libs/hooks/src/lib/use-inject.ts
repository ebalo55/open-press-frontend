import { useIoc } from "./use-ioc";

/**
 * Injects a dependency from the IoC container
 * @param {string} identifier - The identifier of the dependency to inject
 * @returns {T} The dependency
 * @throws {Error} If the dependency does not exist
 */
export const useInject = <T = any>(identifier: string): T => {
	const container = useIoc();

	return container.resolve(identifier) as T;
};

/**
 * Injects a dependency from the IoC container if it exists
 * @param {string} identifier - The identifier of the dependency to inject
 * @returns {T | undefined} The dependency or undefined if it does not exist
 */
export const useSafeInject = <T = any>(identifier: string): T | undefined => {
    const container = useIoc();

    return container.hasRegistration(identifier) ? (container.resolve(identifier) as T) : undefined;
};
