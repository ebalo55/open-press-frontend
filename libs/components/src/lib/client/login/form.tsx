"use client";

import { INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { useIoc } from "@aetheria/hooks";
import { CONFIG } from "@frontend/config";
import { Button, Checkbox, LoadingOverlay, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure, useLocalStorage, useSessionStorage } from "@mantine/hooks";
import { asValue } from "awilix";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { z } from "zod";

const login_schema = z.object({
	email: z.string().email().nonempty(),
	password: z.string().nonempty(),
	remember_me: z.boolean(),
});

export const Form: FC = () => {
    const container = useIoc()
    const router = useRouter()

    const [, set_ss_authentication_token] = useSessionStorage({
        key: INJECTION_TOKENS.instances.authentication_token,
        defaultValue: null
    })
    const [, set_ls_authentication_token] = useLocalStorage({
        key: INJECTION_TOKENS.instances.authentication_token,
        defaultValue: null
    })

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

    const [is_visible, {open: openLoadingOverlay, close: closeLoadingOverlay}] = useDisclosure(false)

    const submit_handle = form.onSubmit(async (values, event) => {
        event.preventDefault()
        openLoadingOverlay()

        try {
            const response = await fetch(`${CONFIG.backend_url}/auth/login`, {
                method: "post",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const body = await response.json();

            if (response.ok) {
                container.register(INJECTION_TOKENS.instances.authentication_token, asValue(body.access_token))

                if (values.remember_me) {
                    set_ls_authentication_token(body.access_token)
                } else {
                    set_ss_authentication_token(body.access_token)
                }
                router.push("/admin/dashboard")

                return;
            }

            form.setErrors({
                email: body.error,
                password: body.error
            })

            closeLoadingOverlay()
        } catch (e) {
            closeLoadingOverlay()
        }
    });

    return (
        <form onSubmit={submit_handle} style={{position: "relative"}}>
            <LoadingOverlay visible={is_visible} overlayBlur={1}/>
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
                    {...form.getInputProps("remember_me", {type: "checkbox"})}
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
