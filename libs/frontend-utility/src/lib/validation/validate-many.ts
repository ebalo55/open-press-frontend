import { Constructor } from "@open-press/frontend-interfaces";
import { z } from "zod";
import { validate } from "./validate";

export const validateMany = <R, T extends z.ZodTypeAny = z.ZodTypeAny, E extends Constructor<Error> = Constructor<Error>>(
	value: any[],
	schema: T[],
	error: E = Error as any
): R => {
	if (value.length !== schema.length) {
		throw new error({
			form_errors: [],
			field_errors: [
				{
					message: "The number of items in the array does not match the number of schemas.",
					code: "invalid_array_length",
				},
			],
		});
	}

	return schema.map((schema, index) => validate(value[index], schema, error)) as any;
};
