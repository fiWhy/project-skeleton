#!/bin/bash

docker build -t dot-client-build . -f docker/Dockerfile.client
docker build -t dot-client-build . -f docker/Dockerfile.client

client_id=$(docker create dot-client-build)
intra_id=$(docker create dot-intra-build)
docker cp $client_id:/app/packages/client/dist/. - >./swag/www/client/temp.tar
docker cp $intra_id:/app/packages/intra/dist/. - >./swag/www/intra/temp.tar

docker rm -v $client_id
docker rm -v $intra_id

tar -xf swag/www/client/temp.tar -C swag/www/client
tar -xf swag/www/intra/temp.tar -C swag/www/intra

rm swag/www/client/temp.tar
rm swag/www/intra/temp.tar

cp nginx/nginx.swag.conf swag/nginx/site-confs/default.conf
cp nginx/api.conf swag/nginx/api.conf

docker compose restart swag
