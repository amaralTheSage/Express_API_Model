docker build -t [nome da imagem] .

docker run --name mysql.node -e MYSQL_ROOT_PASSWORD=1234 -d mysql:9
docker build -t api .
docker compose up