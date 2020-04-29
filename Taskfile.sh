#!/bin/bash

docker-compose -f docker/docker-compose.yml --project-name media-tracker up --build --abort-on-container-exit