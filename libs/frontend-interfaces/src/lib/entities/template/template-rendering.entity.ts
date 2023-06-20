import {TemplateEntity} from "./template.entity";

export type TemplateRenderingEntity = Pick<TemplateEntity, "html" | "css">
