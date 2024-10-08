# Contributing to RaiseTheVoice

Welcome to RaiseTheVoice! We appreciate your interest in contributing. By contributing to this project, you agree to abide by the [Code of Conduct](./CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Issues

If you encounter any issues or have suggestions for improvements, please check the [issue tracker](https://github.com/raisethevoice/raisethevoice/issues) to see if the issue or suggestion has already been raised. If not, feel free to create a new issue with the necessary details.

### Pull Requests

We welcome pull requests! If you'd like to contribute new features, improvements, or bug fixes, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Make your changes and ensure that the code follows the project's coding standards.
4. Write tests for your changes if applicable.
5. Update the documentation to reflect your changes if necessary.
6. Push your changes to your fork: `git push origin feature-name`.
7. Open a pull request, providing a clear description of the changes made and the purpose of those changes.

### Development Setup

To set up the development environment for RaiseTheVoice, follow these steps:

1. Clone your fork of the repository: `git clone https://github.com/raisethevoice/raisethevoice.git`
2. Navigate to the project directory: `cd raisethevoice`
3. Install dependencies for both client and server:
   - **Client**: 
     ```bash
     cd web
     npm install
     ```
   - **Server**: 
     ```bash
     cd server
     python -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     ```
4. Start the application:
   - **Client**: 
     ```bash
     cd web
     npx vite
     ```
   - **Server**: 
     ```bash
     python manage.py runserver
     ```

### Code of Conduct

Please review and adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md) when participating in this project.

## Thank you!

We appreciate your time and effort in contributing to RaiseTheVoice. Your contributions help make this project better for everyone.