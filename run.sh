docker swarm leave -f

docker build -t my_stack_backend ./server
docker build -t my_stack_frontend ./www

docker swarm init

docker stack deploy -c docker-compose.yml my_stack
