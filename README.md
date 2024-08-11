# RaiseTheVoice

**RaiseTheVoice** is a platform for sharing social issues, empowering individuals to raise their voices on matters that affect communities.

## Table of Contents
- [Development](#development)
  - [Client Setup](#client-setup)
  - [Server Setup](#server-setup)
- [Community](#community)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Development

To get started with RaiseTheVoice, first clone the repository:

```bash
git clone https://github.com/raisethevoice/raisethevoice.git
cd raisethevoice
```

### Client Setup

1. **Navigate to the Client Directory**:
    ```bash
    cd web
    ```

2. **Configure Environment Variables**:
    - Create a `.env` file:
      ```bash
      cp .env.example .env
      ```
    - Update the `.env` file with your environment-specific settings if necessary.

3. **Install Packages**:
    ```bash
    npm install
    ```

4. **Run the App**:
    ```bash
    npm run dev
    ```

### Server Setup

1. **Navigate to the Server Directory**:
    ```bash
    cd server
    ```

2. **Create and Activate a Virtual Environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

3. **Install Packages**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Run the Server**:
    ```bash
    python manage.py runserver
    ```

## Community

Join the RaiseTheVoice community to ask questions, share ideas, and contribute:

- [Telegram](https://t.me/+uDztOLfEPYphZTA1)

Please adhere to our [Code of Conduct](./docs/CODE_OF_CONDUCT.md) in all community interactions.

## Contributing

We welcome contributions to RaiseTheVoice! To get started follow our [Contribution Guidelines](./docs/CONTRIBUTING.md).

## Security

If you find a security vulnerability, please report it responsibly by emailing [shakil.hv@gmail.com](mailto:shakil.hv@gmail.com). Do not open a public issue.

## License

RaiseTheVoice is licensed under the [License](./LICENSE.md).