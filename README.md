# KrakenFlex Outage Processing

This small Node.js program solves the KrakenFlex Back End Test by fetching outage data, filtering it based on site information, and posting the filtered data back to an API.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Program](#running-the-program)
- [Running Tests](#running-tests)
- [How It Works](#how-it-works)
- [Dependencies](#dependencies)

## Requirements

To run this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

## Installation

1. **Clone the repository** to your local machine:
    ```bash
    git clone https://github.com/jalal-haidar/kf-backend-test.git
    cd kf-backend-test
    ```

2. **Install the necessary dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the root of the project.
    - Add the following variables (replace `<YOUR_API_KEY>` with your API key):
      ```ini
      API_KEY=<YOUR_API_KEY>
      BASE_URL=<YOUR_BASE_URL>
      ```

## Running the Program

You can run the program using `npm`:

1. **To run the program**:
    ```bash
    npm start
    ```

2. **Development mode with auto-restart**:
    ```bash
    npm run dev
    ```

## Running Tests

This project includes a suite of unit tests written with **Jest** to validate the outage filtering and data processing logic.

1. **To run the tests**:
    ```bash
    npm test
    ```

## How It Works

### Service Layer

1. **Fetching Outages**: The program fetches all outages from the `/outages` endpoint using `axios`.
2. **Fetching Site Info**: It retrieves the site info for `norwich-pear-tree` to get the list of devices.
3. **Filtering Outages**: It filters the outages to exclude those before `2022-01-01` and ensures only outages with IDs matching the site's devices are retained.
4. **Attaching Device Names**: The program adds the `name` of the device to each outage, based on the device information in the site info.
5. **Posting Filtered Outages**: Finally, it posts the filtered outages back to the `/site-outages/{siteId}` endpoint.

## Dependencies

### Production Dependencies:
- **`axios`**: A promise-based HTTP client used to make requests to the KrakenFlex API.
- **`axios-retry`**: Provides automatic retry functionality for failed requests (e.g., 500 errors).
- **`dotenv`**: Loads environment variables from a `.env` file.
- **`express`**: A minimal web framework, useful for future expansions.
- **`winston`**: A logging library used to log information and errors.

### Development Dependencies:
- **`jest`**: A testing framework for unit tests.
- **`ts-jest`**: Jest transformer that compiles TypeScript code.
- **`ts-node`**: Allows running TypeScript files without pre-compiling.
- **`nodemon`**: Automatically restarts the application on file changes.
- **`typescript`**: A superset of JavaScript that adds type safety.
- **`@types/*`**: TypeScript type definitions for specific libraries (e.g., `jest`, `node`, `winston`).