import { Constructor } from "@open-press/frontend-interfaces";
import { z, ZodError } from "zod";

export const validate = <R, T extends z.ZodTypeAny = z.ZodTypeAny, E extends Constructor<Error> = Constructor<Error>>(
	value: any,
	schema: T,
	error: E = Error as any
): R => {
	try {
		return schema.parse(value);
	} catch (e: unknown) {
		if (e instanceof ZodError) {
			const errors = e.flatten((issue) => ({
				message: issue.message,
				code: issue.code,
			}));

			throw new error({
				form_errors: errors.formErrors,
				field_errors: errors.fieldErrors,
			});
		}

		throw e;
	}
};
