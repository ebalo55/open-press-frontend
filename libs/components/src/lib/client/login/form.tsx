"use client";

import { Button, Checkbox, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { FC, FormEvent } from "react";
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

	const submit_handle = (event: FormEvent<HTMLFormElement>) => {
		console.log("submit");
		event.preventDefault();

		form.onSubmit((values, event) => {
			console.log(values);
		})(event);
	};

	return (
		<form onSubmit={submit_handle}>
			<Stack>
				<TextInput
					placeholder={"john.doe@example.com"}
					label={"Email"}
					withAsterisk
					{...form.getInputProps("email")}
				/>
				<PasswordInput
					placeholder="••••••••"
					label="Password"
					withAsterisk
					{...form.getInputProps("password")}
				/>
				<Checkbox
					label={"Remember me!"}
					{...form.getInputProps("remember_me", { type: "checkbox" })}
				/>
				<Button
					variant={"light"}
					type={"submit"}
				>
					Login
				</Button>
			</Stack>
		</form>
	);
};
