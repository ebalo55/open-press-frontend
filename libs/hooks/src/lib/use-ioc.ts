import { useContext } from "react";
import { IocContext } from "./ioc";

export const useIoc = () => {
	const container = useContext(IocContext);

	if (!container) {
		throw new Error("Container not found. Did you forget to wrap your component in <IocProvider />?");
	}

	return container;
};
