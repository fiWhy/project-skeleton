#!/bin/bash

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-recreate

docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build --force-recreate --no-deps -d server

sh ./build.sh
