import { CONFIG } from "@frontend/config";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { DeleteConfirmationModalProps, INJECTION_TOKENS, TemplateEntity } from "@open-press/frontend-interfaces";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import { FC, useCallback } from "react";
import useSWR from "swr";
import { useInject, useSafeInject } from "../use-inject";

/**
 * Delete a template
 * @param {string} id - The template id
 * @param {string} bearer - The bearer token
 * @returns {Promise<axios.AxiosResponse<T>>} - The axios response
 */
const deleteTemplateRequest = async (id: string, bearer: string) => {
	const response = await axios.delete<TemplateEntity>(`${CONFIG.backend_url}/template/${id}`, {
		headers: { Authorization: `Bearer ${bearer}` },
	});

	notifications.show({
		title: "Template Deleted",
		message: `Template ${response.data.name} has been deleted`,
		icon: <IconCheck size={18} />,
		color: "green",
	});

	return response;
};

export const useTemplates = () => {
	const bearer = useSafeInject(INJECTION_TOKENS.instances.authentication_token) || "";

	// Inject the DeleteConfirmationModal component from the templates component library
	const { DeleteConfirmationModal } = useInject<{ DeleteConfirmationModal: FC<DeleteConfirmationModalProps> }>(
		INJECTION_TOKENS.components.templates
	);

	// Fetch the templates from the backend
	const listing = useSWR(`${CONFIG.backend_url}/template`, (key: string) =>
		axios.get<TemplateEntity[]>(key, { headers: { Authorization: `Bearer ${bearer}` } })
	);
	const listing_mutation = listing.mutate;

	// Delete a template and refresh the templates list.
	// As this is a security sensitive operation, we use a confirmation modal to confirm the deletion.
	const deleteTemplate = useCallback(
		async (id: string, template_name: string) => {
			modals.openConfirmModal({
				title: "Delete Template",
				children: <DeleteConfirmationModal template_name={template_name} />,
				onConfirm: async () => {
					await deleteTemplateRequest(id, bearer);
					listing_mutation();
				},
				labels: {
					cancel: "I'm not sure",
					confirm: "I'm sure, delete it",
				},
				confirmProps: {
					variant: "light",
					color: "red.7",
				},
				cancelProps: {
					variant: "light",
				},
			});
		},
		[DeleteConfirmationModal, bearer, listing_mutation]
	);

	return {
		query: {
			listing,
		},
		deleteTemplate,
	};
};
