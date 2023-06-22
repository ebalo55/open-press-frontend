import { ReactChildren } from "@aetheria/frontend-interfaces";
import { AwilixContainer } from "awilix";
import { createContext, FC } from "react";

export const IocContext = createContext<AwilixContainer | null>(null);

type IocProviderProps = ReactChildren & { container: AwilixContainer };

export const IocProvider: FC<IocProviderProps> = ({ children, container }: IocProviderProps) => {
	return <IocContext.Provider value={container}>{children}</IocContext.Provider>;
};
