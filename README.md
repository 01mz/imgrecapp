# Image recognition web app
An image recognition app that allows users to upload images and see classification results


# Architecture
- Frontend: React, TypeScript web client
- Backend: Spring Boot, Java web server
- Image Processing Service: Python image classifier using a pretrained Keras model

# Communication methods
- Frontend web client <-> Java web server via REST API
- Java RabbitMQ client <-> Python RabbitMQ server

# Deployment technology
- Docker containers
- run `docker-compose build && docker-compose up`
- Then head to `localhost:3000` in the browser
