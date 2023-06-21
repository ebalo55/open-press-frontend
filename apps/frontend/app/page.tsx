import { CONFIG } from "@frontend/config";
import { TemplateRenderingEntity } from "@open-press/frontend-interfaces";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
	title: "Welcome to Home",
};

async function getData(): Promise<TemplateRenderingEntity> {
	const response = await fetch(`${CONFIG.backend_url}/template/render/home`);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return await response.json();
}

export default async function Page(): Promise<JSX.Element> {
	const data = await getData();

	const extracted_body_id = /<body\s*[^>]+id=(\w+)\s*[^>]*>/gm.exec(data.html);
	const body_id = extracted_body_id && extracted_body_id.length === 1 ? extracted_body_id[0] : undefined;

	return (
		<>
			<style>{data.css}</style>
			<main
				id={body_id}
				dangerouslySetInnerHTML={{ __html: data.html }}
			></main>
			{data.scripts && (
				<Script
					id={"home_script"}
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{ __html: data.scripts }}
				/>
			)}
		</>
	);
}
