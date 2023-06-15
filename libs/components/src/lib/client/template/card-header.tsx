"use client";

import { Button, Group, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { FC } from "react";

export const CardHeader: FC = () => {
	return (
		<Group position={"apart"}>
			<Title order={2}>Templates</Title>
			<Button
				component={Link}
				href={"/admin/dashboard/editor"}
				leftIcon={<IconPlus size={18} />}
			>
				New Template
			</Button>
		</Group>
	);
};
