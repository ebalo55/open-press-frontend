"use client";

import { Button, Checkbox, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useSubmitOnKeydownEnter } from "@open-press/hooks";
import { FC, useRef } from "react";
import { z } from "zod";

const login_schema = z.object({
	email: z.string().email().nonempty(),
	password: z.string().nonempty(),
	remember_me: z.boolean(),
});

export const Form: FC = () => {
	const form = useForm({
		validate: zodResolver(login_schema),
		initialValues: {
			email: "",
			password: "",
			remember_me: false,
		},
		validateInputOnBlur: true,
		clearInputErrorOnChange: true,
	});

	const form_ref = useRef<HTMLFormElement>(null);
	const { onKeyDown } = useSubmitOnKeydownEnter(form_ref);

	return (
		<form
			onSubmit={form.onSubmit((values) => console.log(values))}
			ref={form_ref}
		>
			<Stack>
				<TextInput
					placeholder={"john.doe@example.com"}
					label={"Email"}
					withAsterisk
					{...form.getInputProps("email")}
					onKeyDown={onKeyDown}
				/>
				<PasswordInput
					placeholder="••••••••"
					label="Password"
					withAsterisk
					{...form.getInputProps("password")}
					onKeyDown={onKeyDown}
				/>
				<Checkbox
					label={"Remember me!"}
					{...form.getInputProps("remember_me", { type: "checkbox" })}
				/>
				<Button variant={"light"}>Login</Button>
			</Stack>
		</form>
	);
};
