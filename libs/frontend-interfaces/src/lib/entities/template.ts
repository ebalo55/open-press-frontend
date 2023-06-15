export interface TemplateEntity {
	id: string;
	name: string;
	html: string;
	css: string;
	project_data: {
		assets: any[];
		styles: any[];
		pages: any[];
	};
	created_at: string;
	updated_at: string;
}
