export const INJECTION_TOKENS = {
    // Object instances
    instances: {
        // Logged in user - consider using useSafeInject as this is not always available
        user: "instances.user",

        // bearer token used in authentication
        authentication_token: "instances.authentication_token"
    },
    // React components
    components: {
        // Login components
        login: "Login",
        loaders: "Loaders",

        // Dashboard components
        dashboard: {
            navbar: "DashboardNavbar",
            sidebar: "DashboardSidebar",
            footer: "DashboardFooter",
            header: "DashboardHeader",
        },
    },
} as const;
