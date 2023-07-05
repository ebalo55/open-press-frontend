# @aetheria/frontend-common

[![License: GPL-2.0](https://img.shields.io/badge/License-GPL--2.0-blue.svg)](https://github.com/override-sh/aetheria-frontend/blob/main/LICENSE)

Welcome to `@aetheria/frontend-common`! This npm package provides a collection of common utilities, components, and
React hooks for the Aetheria frontend project and its plugins.

## Documentation

Please refer to the [official documentation](https://aetheria-docs.override.sh/packages/frontend-common) for detailed
information on how to use this package.

## License

This package is licensed under the GNU General Public License v2.0. You can find the license
file [here](https://github.com/override-sh/aetheria-frontend/blob/main/LICENSE).

## Features

- IOC (Inversion of Control) provider using Awilix for dependency injection.
- Base pages for the frontend, providing a starting point for building your Aetheria application.
- Various utilities and components to simplify common tasks in the frontend development.

## Installation

To install the package, use the following command:

```bash
npm install @aetheria/frontend-common
```

## Usage

Import the desired utilities, components, or hooks from `@aetheria/frontend-common` into your project or plugin files.
You can find detailed usage examples and API documentation in the
[official documentation](https://aetheria-docs.override.sh/packages/frontend-common).

Here's an example of importing and using the IOC provider:

```typescript
import { useInject } from '@aetheria/frontend-common';
import { INJECTION_TOKENS } from '@aetheria/frontend-interfaces';
import { FC } from "react";

const ExampleComponent: FC = () => {
	// inject the bearer token from the IOC container
	const bearerToken = useInject(INJECTION_TOKENS.instances.authentication_token);
	// ...
}
```

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please create an issue or submit a
pull request in the [GitHub repository](https://github.com/override-sh/aetheria-frontend).

Want some quick links? Here are some useful places to get started:

- [Report a bug](https://github.com/override-sh/aetheria-frontend/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5B%40aetheria%2Ffrontend-common%5D%20BUG_TITLE)
- [Request a feature](https://github.com/override-sh/aetheria-frontend/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title=%5B%40aetheria%2Ffrontend-common%5D%20FEATURE_TITLE)

## Let's Get Started!

Let's build amazing things together with Aetheria! 🚀🌟
