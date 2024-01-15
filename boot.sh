#!/bin/bash

# Build and start the Docker containers
docker-compose up -d

# Replace with any additional setup steps you need
# For example, wait for the container to be ready
# You can also run your extension's initialization commands here
sleep 5

# Open Visual Studio Code in the container
code .

# Keep the script running to keep the container running
read -p "Press Enter to stop..."
