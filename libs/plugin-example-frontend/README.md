# @aetheria/plugin-example-frontend

[![License: GPL-2.0](https://img.shields.io/badge/License-GPL--2.0-blue.svg)](https://github.com/override-sh/aetheria-frontend/blob/main/LICENSE)

Welcome to `@aetheria/plugin-example-frontend`! This npm package serves as an example plugin for Aetheria's frontend. It
demonstrates how to register Next.js routes, handle relative imports within the plugin system, and utilize the IOC (
Inversion of Control) container to register components.

## Documentation

Please refer to the [official documentation](https://aetheria-docs.override.sh/plugins/example-frontend) for detailed
information on how to use this plugin.

## License

This package is licensed under the GNU General Public License v2.0. You can find the license
file [here](https://github.com/override-sh/aetheria-frontend/blob/main/LICENSE).

## Features

- Registers Next.js routes for `/example` and `/example/[path]` to showcase custom route handling within the plugin.
- Demonstrates how relative imports are handled within the Aetheria plugin system.
- Utilizes the IOC container to register components and showcases the substitution of an already registered IOC
  component, as seen with the `DashboardHeader` component.

## Installation

To install the package, use the following command:

```bash
npm install @aetheria/plugin-example-frontend
```

## Usage

Once installed, the plugin will automatically register itself with Aetheria's frontend. The Next.js routes `/example`
and `/example/[path]` will be available, showcasing the functionality provided by the plugin system.

To access the registered components within the IOC container, you can utilize the `useInject` hook. Here's an example:

```typescript
import { useInject } from "@aetheria/frontend-common";
import { INJECTION_TOKENS } from "@aetheria/frontend-interfaces";
import { FC } from "react";

const ExampleComponent: FC = () => {
  // Inject the DashboardHeader component from the IOC container
  const DashboardHeader = useInject(INJECTION_TOKENS.components.dashboard_header);
  // ...
};
```

For more detailed information and usage examples, please refer to
the [official documentation](https://aetheria-docs.override.sh/plugins/example-frontend).

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please create an issue or submit a
pull request in the [GitHub repository](https://github.com/override-sh/aetheria-frontend).

To report a bug or request a feature, please use the following links:

- [Report a bug](https://github.com/override-sh/aetheria-frontend/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5B%40aetheria%2Fplugin-example-frontend%5D%20BUG_TITLE)
- [Request a feature](https://github.com/override-sh/aetheria-frontend/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title=%5B%40aetheria%2Fplugin-example-frontend%5D%20FEATURE_TITLE)

## Let's Get Creative!

With the `@aetheria/plugin-example-frontend`, explore the possibilities of building powerful and customizable plugins
for Aetheria's frontend. Unleash your creativity and take your projects to new heights! 🚀✨
