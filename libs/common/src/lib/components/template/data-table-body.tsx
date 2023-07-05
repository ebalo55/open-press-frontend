"use client";

import { DataTableBodyProps } from "@aetheria/frontend-interfaces";
import { Button, Group, Tooltip } from "@mantine/core";
import { IconEdit, IconExternalLink, IconTrash } from "@tabler/icons-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { FC } from "react";
import { useTemplates } from "../../hooks";

export const DataTableBody: FC<DataTableBodyProps> = ({ data }) => {
	const { deleteTemplate } = useTemplates();

	return (
		<>
			{data.map((template) => (
				<tr key={template.id}>
					<td>{template.name}</td>
					<td>{DateTime.fromISO(template.created_at).toFormat("DD HH:mm:ss")}</td>
					<td>{DateTime.fromISO(template.updated_at).toFormat("DD HH:mm:ss")}</td>
					<td>
						<Group>
							<Tooltip
								withArrow
								arrowPosition={"center"}
								label={"View"}
							>
								<Button
									component={Link}
									href={`/${template.name === "home" ? "" : template.name}`}
									variant={"light"}
								>
									<IconExternalLink size={18} />
								</Button>
							</Tooltip>
							<Tooltip
								label={"Edit"}
								withArrow
								arrowPosition={"center"}
							>
								<Button
									component={Link}
									href={`/admin/dashboard/editor/${template.id}`}
									variant={"light"}
									color={"grape"}
								>
									<IconEdit size={18} />
								</Button>
							</Tooltip>
							<Tooltip
								label={"Delete"}
								withArrow
								arrowPosition={"center"}
							>
								<Button
									onClick={() => deleteTemplate(template.id, template.name)}
									variant={"light"}
									color={"red.7"}
								>
									<IconTrash size={18} />
								</Button>
							</Tooltip>
						</Group>
					</td>
				</tr>
			))}
		</>
	);
};
