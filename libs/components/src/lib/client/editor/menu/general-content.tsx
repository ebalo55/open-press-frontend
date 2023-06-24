"use client";

import { BlockEditorProps, INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { useSafeInject, useTemplates } from "@aetheria/hooks";
import { CONFIG } from "@frontend/config";
import { Button, Divider, LoadingOverlay, Stack, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconTemplate } from "@tabler/icons-react";
import axios from "axios";
import { FC, useEffect } from "react";
import { z } from "zod";

const general_info_schema = z.object({
	name: z
		.string()
		.nonempty()
		.regex(/^[-a-zA-Z0-9@:%_+.~#?&/=]+$/, "Template name must be a valid URL path"),
});

export const GeneralContent: FC<BlockEditorProps> = ({ id }) => {
	const { data } = useTemplates(id).query.get;
	const [visible, { open, close }] = useDisclosure(false);
	const bearer = useSafeInject(INJECTION_TOKENS.instances.authentication_token) || "";

	const form = useForm({
		initialValues: {
			name: data?.data.name ?? "",
		},
		validate: zodResolver(general_info_schema),
		validateInputOnBlur: true,
		clearInputErrorOnChange: true,
	});

	// NOTE: never append `form` to the dependency array of this effect unless you want to trigger an infinite loop
	useEffect(() => {
		const values = {
			name: data?.data.name ?? "",
		};
		form.setValues(values);
		form.resetDirty(values);
	}, [data?.data.name]);

	const on_submit = async (values: { name: string }) => {
		open();

		await axios.put(`${CONFIG.backend_url}/template/${id}`, values, {
			headers: {
				Authorization: `Bearer ${bearer}`,
			},
		});

		close();
		notifications.show({
			title: "Template updated",
			message: "The template have been saved successfully!",
			color: "green",
			icon: <IconCheck size={18} />,
		});
	};

	return (
		<>
			<Title order={6}>General</Title>
			<Divider mb={"sm"} />
			<form onSubmit={form.onSubmit(on_submit)}>
				<LoadingOverlay
					visible={visible}
					overlayBlur={1}
				/>
				<Stack spacing={"xs"}>
					<TextInput
						label={"Template name"}
						placeholder={"blog/2023-06-22/post-title"}
						withAsterisk
						icon={<IconTemplate size={18} />}
						{...form.getInputProps("name")}
					/>
					<Button
						variant={"light"}
						type={"submit"}
						ml={"auto"}
					>
						Save
					</Button>
				</Stack>
			</form>
		</>
	);
};
