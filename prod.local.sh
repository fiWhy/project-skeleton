#!/bin/bash

docker compose -f docker-compose.yml -f docker-compose.prod.local.yml up --build
