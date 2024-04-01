# Flutter Feature Scaffolder

The Flutter Feature Scaffolder is a Visual Studio Code extension designed to boost productivity by quickly scaffolding new features for Flutter applications using Clean Architecture. It automates the creation of a consistent directory and file structure for new features, including the setup for data, domain, and presentation layers according to Clean Architecture principles.

## Features

- **Scaffold New Flutter Feature**: Generates a new feature structure with all necessary layers and files, including `index.dart` files for easy exporting and importing.
- **Clean Architecture Compliant**: Structures created by the extension follow the Clean Architecture guidelines, promoting a scalable, testable, and maintainable codebase.
- **BLoC Pattern**: Supports the Business Logic Component (BLoC) pattern for state management within the presentation layer.

## Getting Started

### Prerequisites

- Visual Studio Code
- Flutter SDK
- Dart SDK

### Installation

1. Open Visual Studio Code.
2. Navigate to the Extensions view by clicking on the square icon on the sidebar or pressing `Ctrl+Shift+X` (`Cmd+Shift+X` on macOS).
3. Search for `Flutter Feature Scaffolder`.
4. Click on **Install**.

### Usage

1. Open your Flutter project in Visual Studio Code.
2. Press `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS) to open the Command Palette.
3. Type `Scaffold Flutter Feature` and press Enter.
4. Enter the name of the feature you wish to scaffold when prompted.
5. The extension will create a new feature structure under `lib/src/features/[your_feature_name]`.

## Extension Settings

This extension does not require any specific settings to be adjusted.

## Known Issues

For a list of known issues, please visit the [GitHub issues page](https://github.com/your-github-account/flutter_feature_scaffolder/issues).

## Contributing

We welcome contributions and suggestions! Please see the [CONTRIBUTING.md](https://github.com/your-github-account/flutter_feature_scaffolder/CONTRIBUTING.md) file for guidelines on how to contribute.

## Release Notes

### 1.0.0

Initial release of the Flutter Feature Scaffolder:

- Scaffold new Flutter feature with Clean Architecture.
- Generate `index.dart` files for each directory.

## Support

If you encounter any problems or have suggestions, please open an issue on the [GitHub issues page](https://github.com/your-github-account/flutter_feature_scaffolder/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/your-github-account/flutter_feature_scaffolder/LICENSE) file for details.
