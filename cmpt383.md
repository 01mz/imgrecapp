# Image recognition web app
User uploads an image and the app attempts to classify it.


# Programming languages
- **JavaScript/TypeScript** + React to build out the frontend of the web app
- **Java** Spring Boot REST API for the backend + RabbitMQ client
- **Python** RabbitMQ server along with image classification code

# Communication methods
- Frontend web app <-> Java REST API server <-> Python RabbitMQ server

- The frontend makes requests to the backend 
- The backend has a service that calls a RabbitMQ client to communicate with the python RabbitMQ server 
- Python produces a classification result (using tensorflow)
- The RabbitMQ server returns the classification result to the backend
- The backend server returns result to frontend

# Deployment technology
- Docker containers
`docker-compose build && docker-compose up`
- Then head to `localhost:3000` in the browser
