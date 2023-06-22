"use client";

import { DeleteConfirmationModalProps } from "@aetheria/frontend-interfaces";
import { Text } from "@mantine/core";
import { FC } from "react";

export const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({ template_name }) => {
	return <Text size={"sm"}>Are you sure you want to delete the template named "{template_name}"?</Text>;
};
