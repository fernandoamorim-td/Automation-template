#!/bin/bash

TEST_ENV=$1

SERVICE=${2:-smoke-tests-prd}

function exiting {
  docker-compose --project-name "template" down --rmi local --volumes
  exit $EXIT
}

echo "Starting tests..."
echo "Building Docker image"
docker-compose --project-name "template" build $SERVICE
docker-compose --project-name "template" run -e NODE_ENV=$TEST_ENV $SERVICE

EXIT=$?
echo "Done!"
exiting
