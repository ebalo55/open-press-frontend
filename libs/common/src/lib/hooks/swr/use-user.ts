"use client";

import { INJECTION_TOKENS, UserEntity } from "@aetheria/frontend-interfaces";
import axios from "axios";
import useSWR from "swr";
import { CONFIG } from "../../config";
import { useSafeInject } from "../use-inject";

/**
 * Get the current logged in user and register it in the IOC container
 */
export const useUser = () => {
	const bearer = useSafeInject(INJECTION_TOKENS.instances.authentication_token) || "";

	const { mutate, data, error, isLoading, isValidating } = useSWR(
		`${CONFIG.public_backend_url}/auth/profile`,
		(key: string) => axios.get<UserEntity>(key, { headers: { Authorization: `Bearer ${bearer}` } })
	);

	if (data && data.status >= 200 && data.status <= 299) {
		return {
			error,
			user: data.data,
			mutate,
			isLoading,
			isValidating,
		};
	}

	return {
		error: data?.data,
		user: null,
		mutate,
		isLoading,
		isValidating,
	};
};
