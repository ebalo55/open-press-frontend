"use client";

import { INJECTION_TOKENS, NewTemplateModalProps } from "@aetheria/frontend-interfaces";
import { Button, LoadingOverlay, Modal, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconTemplate } from "@tabler/icons-react";
import axios, { isAxiosError } from "axios";
import { FC } from "react";
import { z } from "zod";
import { CONFIG } from "../../config";
import { useSafeInject, useTemplates } from "../../hooks";

const general_info_schema = z.object({
	name: z
		.string()
		.nonempty()
		.regex(/^[-a-zA-Z0-9@:%_+.~#?&/=]+$/, "Template name must be a valid URL path"),
});

export const NewTemplateModal: FC<NewTemplateModalProps> = ({ opened, open, close }) => {
	const { mutate } = useTemplates().query.listing;
	const bearer = useSafeInject(INJECTION_TOKENS.instances.authentication_token) || "";

	const [overlay_opened, { open: overlay_open, close: overlay_close }] = useDisclosure(false);

	const form = useForm({
		initialValues: {
			name: "",
		},
		validate: zodResolver(general_info_schema),
		validateInputOnBlur: true,
		clearInputErrorOnChange: true,
	});

	const on_submit = async (values: { name: string }) => {
		overlay_open();

		try {
			await axios.post(
				`${CONFIG.backend_url}/template`,
				{
					...values,
					html: "<body></body>",
					css: "* {}",
					project_data: {
						assets: [],
						styles: [],
						pages: [
							{
								frames: [
									{
										component: {
											type: "wrapper",
											stylable: [
												"background",
												"background-color",
												"background-image",
												"background-repeat",
												"background-attachment",
												"background-position",
												"background-size",
											],
											attributes: { id: "ijkw" },
										},
									},
								],
								type: "main",
								id: "S9ZIYR4viKNrkp8F",
							},
						],
					},
				},
				{
					headers: {
						Authorization: `Bearer ${bearer}`,
					},
				}
			);
			await mutate();
		} catch (e: any) {
			if (isAxiosError(e)) {
				form.setErrors(e.response?.data?.field_errors || {});
				overlay_close();
				return;
			}
		}

		overlay_close();
		close();

		notifications.show({
			title: "Template create",
			message: "The new template have been successfully created!",
			color: "green",
			icon: <IconCheck size={18} />,
		});
	};

	return (
		<Modal
			opened={opened}
			onClose={close}
			title={"Create new template"}
			closeOnClickOutside
			withCloseButton
		>
			<form onSubmit={form.onSubmit(on_submit)}>
				<LoadingOverlay
					visible={overlay_opened}
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
						Create
					</Button>
				</Stack>
			</form>
		</Modal>
	);
};
