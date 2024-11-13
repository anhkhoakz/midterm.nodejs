# TicketHub

## Key Features

## Installation

```

```

#### Docker Swarm

```sh
docker swarm leave -f

docker build -t my_stack_backend ./server

docker build -t my_stack_frontend ./www

docker swarm init

docker stack deploy -c docker-compose.yml my_stack
```

## Usage

```sh
cd server && pnpm start

cd www && pnpm start

```

## Contributing

We welcome pull requests. Before making any significant modifications, please start an issue to explain your requests.

Please remember to update the tests as necessary.

## License

[![GNU General Public License v3.0](https://github.com/user-attachments/assets/a750987b-05be-4b37-a53a-65a84cc00452)](LICENSE.md)
