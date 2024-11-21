# Customer Manager

## Key Features

-   User authentication and authorization
-   Manage customers
-   Responsive user interface

## Installation

To get started with the CustomerManager project, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/anhkhoakz/midterm.nodejs.git
    cd midterm.nodejs
    ```

2. Navigate to the `server` directory and install dependencies:

    ```sh
    cd server
    pnpm install
    ```

3. Navigate to the `www` directory and install dependencies:

    ```sh
    cd ../www
    pnpm install
    ```

4. Set up environment variables:
    - Copy the `.env.example` file to `.env` in both the `server` and `www` directories and fill in the required values.

## Running the Application

### Using Docker Swarm

1. Leave any existing Docker Swarm:

    ```sh
    cd ..
    docker swarm leave -f
    ```

2. Build the Docker images:

    ```sh
    docker build -t my_stack_backend ./server
    docker build -t my_stack_frontend ./www
    ```

3. Initialize Docker Swarm:

    ```sh
    docker swarm init
    ```

4. Deploy the stack:
    ```sh
    docker stack deploy -c docker-compose.yml my_stack
    ```
5. Access the application:
    Open your browser and navigate to: http://localhost


## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
