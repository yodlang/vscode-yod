<!--
SPDX-FileCopyrightText: 2025 Milesime <213074881+milesime@users.noreply.github.com>

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Contributing to Yod

Thank you for your interest in contributing to Yod! We welcome contributions from everyone. This document outlines the process for contributing to the project.

## Setting up the development environment

To contribute to the VS Code extension of Yod, you’ll need to set up a JavaScript and TypeScript development environment. If you are using [nix-direnv](https://github.com/nix-community/nix-direnv), you can skip this section.

Follow these steps:

1. [Install](https://bun.sh/docs/installation) [Bun](https://bun.sh/)

2. Clone the vscode-yod repository:

   ```sh
   git clone https://github.com/yodlang/vscode-yod.git
   cd vscode-yod
   ```

3. Install project dependencies:

   ```sh
   bun install
   ```

## Manual installation

In the root directory of the repository, build the extension:

```sh
bun run package
```

Then in Visual Studio Code:

1. Open the command palette (<kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>P</kbd>)
2. Search for and select “Developer: Install Extension from Location…”
3. Navigate to and select the root directory of the repository (`vscode-yod`)

The extension is now installed for development purposes.

## Contributing workflow

1. Fork the repository and create your branch from `main`
2. Make your changes, ensuring they adhere to the project’s coding style and conventions
3. Update the documentation if necessary
4. Update the `.gitignore` if you think it will be useful for others
5. Test your changes thoroughly
6. Create a pull request with a clear description of your changes

## Code style

Please adhere to the coding style used throughout the project. Consistency in code style makes the project easier to read and maintain.

## Documentation

If you’re adding new features or making significant changes, please update the relevant documentation. This includes:

- Updating the `README.md` if necessary
- Adding or updating comments in the code
- Updating or creating new documentation in the `docs` directory

## Testing

Before submitting your changes, ensure the extension still runs as expected. It’s a good idea to add tests if you’re introducing new features or fixing a bug, helping to ensure the stability of the extension in the future.

## Licensing and REUSE compliance

Our project follows the [REUSE initiative](https://reuse.software/) guidelines to make handling licensing straightforward and transparent.

Please include a license header in every file you create or modify. A tutorial on how to do this is [available here](https://reuse.software/tutorial/).

If you’re unsure about which license to use or how to add it, please ask for guidance in your pull request or issue.

## Getting help

If you need help or have questions, you can:

- Open an issue in the [GitHub repository](https://github.com/yodlang/vscode-yod/issues)
- Leave comments on existing issues or pull requests
- Reach out to the maintainers directly

## Additional resources

- [Yod wiki](https://github.com/yodlang/yod/wiki)
- [Bun documentation](https://bun.sh/docs)
- [VS Code API documentation](https://code.visualstudio.com/api)

We appreciate your contributions and are excited to see what you bring to Yod. Thank you for contributing!
