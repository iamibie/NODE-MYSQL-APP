# My Dockerized Web Application

This project sets up a full-stack web application using Docker Compose. It includes a MySQL database, a Node.js backend, and a static frontend served through Nginx.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- MySQL database container
- Node.js backend container with automatic restarts
- Static frontend served through Nginx
- WebSocket support
- Docker Compose for easy setup and management

## Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/This-repo.git
   cd your-repo
2. Create a .env file in the root directory and set your environment variables:

               MYSQL_ROOT_PASSWORD=your_root_password
               MYSQL_DATABASE=your_database
               MYSQL_USER=your_user
               MYSQL_PASSWORD=your_password
4. Build and start the Docker containers:


         docker-compose up --build
This will start the MySQL database, Node.js backend, and Nginx server.

## Configuration
Docker Compose
Here's an overview of the docker-compose.yml configuration:
      
      services:
        db:
          image: mysql:latest
          restart: always
          environment:
            MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
            MYSQL_DATABASE: ${MYSQL_DATABASE}
            MYSQL_USER: ${MYSQL_USER}
            MYSQL_PASSWORD: ${MYSQL_PASSWORD}
          ports:
            - "3306:3306"
          volumes:
            - db-data:/var/lib/mysql
          networks:
            - app-network
        backend:
          build:
            context: ./
            dockerfile: Dockerfile
          image: node-backend-img
          container_name: portfolio-backend-container
          command: /usr/src/app/node_modules/.bin/nodemon server.js
          volumes:
            - ./:/usr/src/app
            - /usr/src/app/node_modules
            - ./public:/usr/src/app/public
          ports:
            - "5000:5000"
          env_file: .env
          networks:
            - app-network
        nginx:
          build:
            context: ./nginx
            dockerfile: Dockerfile
          ports:
            - "80:80"
          volumes:
            - ./public:/usr/share/nginx/html:ro
          networks:
            - app-network
          restart: always
      networks:
        app-network:
          driver: bridge
      volumes:
        db-data:
        node_modules:
        web-root:
          driver: local
## Usage
Access the frontend at http://localhost.

The backend can be accessed at http://localhost:5000.

Example Nginx Configuration:

      upstream backend {
          server backend:8000;
      } 
      server {
          listen 80;
          location / {
              proxy_pass http://backend; 
              proxy_set_header Host $host;
              proxy_set_header X-Forwarded-For $remote_addr;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_read_timeout 3600;
          }
          location /sockjs-node {
              proxy_pass http://backend;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection "Upgrade";
          }
          location /api {
              proxy_pass http://backend;
          }
      }
   
Connecting to the MySQL Database

In your Node.js application, use the following configuration to connect to the MySQL database:

      const mysql = require('mysql');
      const connection = mysql.createConnection({
          host: 'db',
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE
      });
      connection.connect((err) => {
          if (err) {
              console.error('Error connecting to the database:', err.stack);
              return;
          }
          console.log('Connected to the database as id', connection.threadId);
      });
   
## Folder Structure
      .
      ├── .env
      ├── docker-compose.yml
      ├── backend
      │   ├── Dockerfile
      │   ├── server.js
      │   └── ...
      ├── nginx
      │   ├── Dockerfile
      │   └── nginx.conf
      ├── public
      │   ├── index.html
      │   ├── styles.css
      │   └── ...
      └── ...
   
## Contributing

Fork the repository

Create your feature branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature/your-feature)

Create a new Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
