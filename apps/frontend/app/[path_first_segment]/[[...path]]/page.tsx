"use client";

import { INJECTION_TOKENS, TemplateRenderingEntity } from "@aetheria/frontend-interfaces";
import { useInject } from "@aetheria/hooks";
import { CONFIG } from "@frontend/config";
import Script from "next/script";
import { FC, Suspense, useEffect, useMemo, useState } from "react";

interface Params {
	path?: string[];
	path_first_segment: string;
}

interface Props {
	params: Params;
}

async function getData(path: string): Promise<TemplateRenderingEntity> {
	const response = await fetch(`${CONFIG.backend_url}/template/render/${path}`);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return await response.json();
}

/**
 * This page can be seen as a `relative catch-all` basically meaning that will catch all routes from root on except for
 * the one specifically defined in the root path (see the example with the admin routes).
 *
 * This particular behaviours is achieved by prefixing the `optional catch-all` path with a `dynamic segment`
 * that automatically handles path on the same route folder.
 *
 * The achieved behaviour differs from the one that will be achieved by using only an `optional catch-all` route at the
 * root because of what we name "specificity" levels assigned to paths.
 *
 * Here are the current specificity levels of next 13:
 *  - optional catch all: {specificity: 0} - catch all routes doesn't matter if they are dynamic or not
 *  - standard routes with pages and layouts: {specificity: 1} - standard routes are routes that are not dynamic with
 * layouts, pages etc.
 *  - dynamic routes: {specificity: 2} - one (or more) dynamic segment(s) in the path but no optional catch-all, always
 * have at least a page
 *
 * The wrap of the `optional catch-all` route ensures that top level standard routes have always a higher priority on
 * the catch-all segment, allowing to achieve the following behaviour:
 *  - standard routes:
 *      - {path: "/", handler: "page.tsx", relative_catch_all: false}
 *      - {path: "/admin", handler: "admin/page.tsx", relative_catch_all: false}
 *      - {path: "/admin/dashboard", handler: "admin/dashboard/page.tsx", relative_catch_all: false}
 *
 *  - optional catch-all routes:
 *      - {path: "/sample", handler: "[path_first_segment]/[[...path]]/page.tsx", relative_catch_all: true}
 *      - {path: "/sample/fragment", handler: "[path_first_segment]/[[...path]]/page.tsx", relative_catch_all: true}
 *      - {path: "/sample/fragment/sub/path/with/multiple/levels", handler: "[path_first_segment]/[[...path]]/page.tsx",
 * relative_catch_all: true}
 *
 * @param params
 * @constructor
 */
export default function Page({params}: Props): JSX.Element {
	const {
		path,
		path_first_segment,
	} = params;

	const {FullPage} = useInject<{ FullPage: FC }>(INJECTION_TOKENS.components.loaders);

	// Join the path segments together with an url encoded slash
	const navigation_path = useMemo(
		() => {
			if (path) {
				return [
					path_first_segment,
					...path,
				].join("%2F");
			}

			return [ path_first_segment ].join("%2F");
		},
		[
			path,
			path_first_segment,
		],
	);

	const [ data, set_data ] = useState<TemplateRenderingEntity | null>(null);
	const [ body_id, set_body_id ] = useState<string | undefined>(undefined);

	useEffect(() => {
		getData(navigation_path).then((value) => {
			set_data(value);

			const extracted_body_id = /<body\s*[^>]+id=(\w+)\s*[^>]*>/gm.exec(value.html);
			set_body_id(extracted_body_id && extracted_body_id.length === 1 ? extracted_body_id[0] : undefined);
		});
	}, [ navigation_path ]);

	return (
		<>
			<Suspense fallback={<FullPage />}>
				{data && (
					<>
						<style>{data.css}</style>
						<main
							id={body_id}
							dangerouslySetInnerHTML={{__html: data.html}}
						></main>
						{data.scripts && (
							<Script
								id={"home_script"}
								strategy="afterInteractive"
								dangerouslySetInnerHTML={{ __html: data.scripts }}
							/>
						)}
					</>
				)}
			</Suspense>
		</>
	);
}
