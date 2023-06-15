"use client";

import { Button, Group } from "@mantine/core";
import { DataTableBodyProps } from "@open-press/frontend-interfaces";
import { useTemplates } from "@open-press/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { FC } from "react";

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
							<Button
								component={Link}
								href={`/admin/dashboard/editor/${template.id}`}
								variant={"light"}
								leftIcon={<IconEdit size={18} />}
							>
								Edit
							</Button>
							<Button
								onClick={() => deleteTemplate(template.id, template.name)}
								variant={"light"}
								color={"red.7"}
								leftIcon={<IconTrash size={18} />}
							>
								Delete
							</Button>
						</Group>
					</td>
				</tr>
			))}
		</>
	);
};
