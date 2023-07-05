import { CONFIG } from "@aetheria/frontend-common";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const unauthorized = NextResponse.json(
	{
		revalidated: false,
		error: "Unauthorized",
	},
	{ status: 401 }
);

export async function POST(request: NextRequest) {
	const authorization_header = request.headers.get("Authorization");

	if (!authorization_header) {
		return unauthorized;
	}

	// tries to get the token from the authorization header or fails with an error
	let authorization: string | null = null;
	try {
		authorization = authorization_header.split(" ")[1];
	} catch (e) {
		return unauthorized;
	}

	// verifies the token with the backend
	const response = await axios.get(`${CONFIG.backend_url}/auth/revalidate`, {
		headers: {
			Authorization: `Bearer ${authorization}`,
		},
	});

	// if the token is invalid or the backend says we can't revalidate, return an error
	if (response.status !== 200 || !response.data.can_revalidate) {
		return unauthorized;
	}

	// revalidate the tag
	const { tag }: { tag: string } = await request.json();
	revalidateTag(tag);

	return NextResponse.json({
		revalidated: true,
		tag,
		timestamp: Date.now(),
	});
}
