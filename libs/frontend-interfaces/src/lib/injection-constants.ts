export const INJECTION_TOKENS = {
	// Object instances
	instances: {
		// Logged in user - consider using useSafeInject as this is not always available
		user: "instances.user",

		// bearer token used in authentication
		authentication_token: "instances.authentication_token",

		// keeps the value of the first loaded url, this is used to redirect the user to the originally requested page
		// after login verification
		initial_navigation_url: "instances.initial_navigation_url",
	},
	// React components
	components: {
		// Login components
		login: "Login",
		loaders: "Loaders",
		templates: "Templates",
		editor: "Editor",

		// Dashboard components
		dashboard: {
			navbar: "DashboardNavbar",
			sidebar: "DashboardSidebar",
			footer: "DashboardFooter",
			header: "DashboardHeader",
		},
	},
} as const;
