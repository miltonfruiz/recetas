# Gestor de Recetas
## Table of Contents
1. [Stack](#stack)
2. [Installation](#installation)
3. [Docker](#docker)
4. [Endpoints](#endpoints)
5. [Security](#security)

## Stack
* Node.js
* Express.js
* MongoDB
* Mongoose

## Installation
To install the application, run the following command:
```bash
npm install
```

## Docker
To run the application using Docker, follow these steps:
1. Build the Docker image:
```bash
docker build -t gestor-de-recetas .
```
2. Run the Docker container:
```bash
docker run -p 5000:5000 gestor-de-recetas
```

## Endpoints
The following endpoints are available:
### Authentication
* **POST /api/auth/register**: register a new user
* **POST /api/auth/login**: login user
### Recipes
* **GET /api/recipes**: list recipes (requires authentication)
* **POST /api/recipes**: create recipe (requires authentication)
* **GET /api/recipes/:id**: get recipe by id (requires authentication)
* **PUT /api/recipes/:id**: update recipe (requires authentication)
* **DELETE /api/recipes/:id**: delete recipe (requires authentication)

## Security
The application uses the following security measures:
* Authentication using JSON Web Tokens (JWT)
* Input validation and sanitization using Joi
* Error handling and logging using Winston
* Secure connection using HTTPS (in production environment)
* Environment variables for sensitive data (e.g. database credentials)
* Dependencies are kept up-to-date to prevent known vulnerabilities
Note: The `MONGO_URI` environment variable should be set to a secure MongoDB connection string.