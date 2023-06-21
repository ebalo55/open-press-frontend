import { TemplateEntity } from "./template.entity";

export interface TemplateRenderingEntity extends Pick<TemplateEntity, "html" | "css"> {
	scripts?: string;
}
