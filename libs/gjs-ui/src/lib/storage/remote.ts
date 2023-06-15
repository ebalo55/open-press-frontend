import { CONFIG } from "@frontend/config";
import { TemplateEntity } from "@open-press/frontend-interfaces";
import axios from "axios";
import { IStorage, StorageOptions } from "grapesjs";

export const CustomRemoteStorage: IStorage<StorageOptions> = {
	async load(options) {
		const response = await axios.get<TemplateEntity>(`${CONFIG.backend_url}/template/${options.id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${options.bearer}`,
			},
		});

		return response.data.project_data;
	},
	async store(data, options) {
		return await axios.put<TemplateEntity>(
			`${CONFIG.backend_url}/template/${options.id}`,
			{
				project_data: data.data,
				html: data.rendered_pages[0].html,
				css: data.rendered_pages[0].css.length > 0 ? data.rendered_pages[0].css : undefined,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${options.bearer}`,
				},
			}
		);
	},
};
