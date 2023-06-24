"use client";

import { INJECTION_TOKENS, NewTemplateModalProps } from "@aetheria/frontend-interfaces";
import { useInject } from "@aetheria/hooks";
import { Button, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { FC } from "react";

export const CardHeader: FC = () => {
	const [opened, { open, close, toggle }] = useDisclosure(false);
	const { NewTemplateModal } = useInject<{ NewTemplateModal: FC<NewTemplateModalProps> }>(
		INJECTION_TOKENS.components.templates
	);

	return (
		<>
			<Group position={"apart"}>
				<Title order={2}>Templates</Title>
				<Button
					leftIcon={<IconPlus size={18} />}
					onClick={open}
				>
					New Template
				</Button>
			</Group>
			<NewTemplateModal
				opened={opened}
				open={open}
				close={close}
				toggle={toggle}
			/>
		</>
	);
};
