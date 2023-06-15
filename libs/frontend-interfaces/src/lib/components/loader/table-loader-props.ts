import { LoaderProps } from "@mantine/core";
import { ReactChildren } from "../../react-children";

export interface TableLoaderProps extends LoaderProps, ReactChildren {
	columns: number;
}
