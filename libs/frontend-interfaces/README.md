# @aetheria/frontend-interfaces

[![License: GPL-2.0](https://img.shields.io/badge/License-GPL--2.0-blue.svg)](https://github.com/override-sh/aetheria-frontend/blob/main/LICENSE)

Welcome to `@aetheria/frontend-interfaces`! This npm package provides a collection of default interfaces used in the
Aetheria frontend project and its plugins.

## Documentation

Please refer to the [official documentation](https://aetheria-docs.override.sh/packages/frontend-interfaces) for
detailed information on how to use this package.

## License

This package is licensed under the GNU General Public License v2.0. You can find the license
file [here](https://github.com/override-sh/aetheria-frontend/blob/main/LICENSE).

## Features

- Default interfaces for the frontend project and plugins.
- `INJECTION_TOKENS` constant object for dependency injection, avoiding the use of magic strings.

## Installation

To install the package, use the following command:

```bash
npm install @aetheria/frontend-interfaces
```

## Usage

Import the desired interfaces or constants from `@aetheria/frontend-interfaces` into your project or plugin files. These
interfaces and constants provide a solid foundation for building your Aetheria frontend application.

Here's an example of importing and using the `INJECTION_TOKENS` constant object for dependency injection:

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

For more examples and detailed information, please check
the [official documentation](https://aetheria-docs.override.sh/packages/frontend-interfaces).

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please create an issue or submit a
pull request in the [GitHub repository](https://github.com/override-sh/aetheria-frontend).

Want to report a bug or request a feature? Here are some useful links to get started:

- [Report a bug](https://github.com/override-sh/aetheria-frontend/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5B%40aetheria%2Ffrontend-interfaces%5D%20BUG_TITLE)
- [Request a feature](https://github.com/override-sh/aetheria-frontend/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title=%5B%40aetheria%2Ffrontend-interfaces%5D%20FEATURE_TITLE)

## Let's Build Amazing Things!

Let's create powerful and extensible Aetheria frontend applications together! 🚀🌟
