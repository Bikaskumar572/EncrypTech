# EncrypTech - AES Encryption

EncrypTech is a full-stack web application for encrypting and decrypting sensitive user data using the AES (Advanced Encryption Standard) algorithm. This project is built with Node.js, Express, and MongoDB for secure data storage.

## Features

- User registration with sensitive data encryption.
- Data retrieval with decryption.
- User login for secure access.
- User data updating capabilities (under development).

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed locally or a connection to a MongoDB database.

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/Bikaskumar572/encryp-tech.git
   cd encryp-tech
   ```

2. Install project dependencies:

   ```shell
   npm install
   ```

3. Create a `.env` file in the project root with the following environment variables:

   ```env
   DB_CONNECT=your_mongodb_connection_string
   SECRET_KEY=your_secret_key
   PORT=your_preferred_port
   ```

4. Run the application:

   ```shell
   npm start
   ```

5. The application should now be running at `http://localhost:your_preferred_port`.

## Usage

- Visit `http://localhost:your_preferred_port` to access the application.

- Use the provided endpoints to register, log in, and access or update encrypted user data.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests to improve EncrypTech. You can also contribute by adding new features and enhancements.

## Acknowledgments

- This project uses the AES encryption algorithm for secure data handling.

Replace placeholders like `yourusername`, `your_mongodb_connection_string`, `your_secret_key`, and `your_preferred_port` with your actual information.
