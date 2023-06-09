export const INJECTION_TOKENS = {
	// Object instances
	instances: {
		// Logged in user - consider using useSafeInject as this is not always available
		user: "instances.user",
	},
	// React components
	components: {
		// Login components
		login: "Login",
		loaders: "Loaders",
	},
} as const;
