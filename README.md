# University of Haifa Research Proposal Management System

## Project Description

The University of Haifa Research Proposal Management System is a web application designed to streamline the process of submitting, reviewing, and managing research proposals within the university. This MEAN STACK (MongoDB, Express.js, Angular, Node.js) project offers a comprehensive solution with unique and generic features to enhance the proposal management experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)

## Installation

### Prerequisites

Before getting started, ensure you have the following prerequisites installed on your system:

- Node.js and npm
- MongoDB
- Angular CLI

### Client (Angular)

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install client dependencies:

   ```bash
   npm install
   ```

3. Start the Angular development server:

   ```bash
   ng serve
   ```

4. Access the client application in your web browser at `http://localhost:4200`.

### Server (Node.js / Express.js)

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install server dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables by creating a `.env` file in the `server` directory. Include necessary variables such as `PORT`, `DATABASE_URL`, and `SECRET_KEY`.

4. Start the Node.js server:

   ```bash
   npm start
   ```

5. Access the server API at `http://localhost:3000`.

## Usage

1. Register for an account on the University of Haifa Research Proposal Management System.

2. Log in to your account using your credentials.

3. Submit research proposals, including all necessary fields.

4. Review and evaluate submitted research proposals if you have reviewer permissions.

5. Administer the system as an admin user by updating proposal statuses, adding custom fields, and managing users.

## Configuration

The system's configuration can be customized via environment variables in the server's `.env` file. Ensure that you configure the necessary variables, including the database connection URL, server port, and secret key.
