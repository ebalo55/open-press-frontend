import { FC } from "react";

export const DataTableHeader: FC = () => {
	return (
		<thead>
			<tr>
				<th style={{ width: "33%" }}>Template</th>
				<th style={{ width: "25%" }}>Created</th>
				<th style={{ width: "25%" }}>Updated</th>
				<th>Actions</th>
			</tr>
		</thead>
	);
};
