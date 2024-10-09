# Web Shop Express Application
This project is a web shop application built with Express and Sequelize ORM. 
It includes various routes for handling products, orders, and shopping cart functionality. 
The application uses Sequelize to manage the database and provides an easy setup for creating a simple e-commerce API.

## Features

  * Sequelize ORM: Manages database interactions for User, Product, Order, and Cart models.
  * Express Routes: Modular routing for handling products, orders, and shopping cart operations.
  * Body Parser: Parses URL-encoded data to handle form submissions.
  * Database Sync: Synchronizes models with the database upon startup, creating tables if they don't already exist.
  * User Association: Automatically associates a user with requests and creates a cart if it doesn't exist.

## Prerequisites

  Node.js: Install Node.js for running the application.

  NPM: A package manager for Node.js.

  Sequelize CLI: To work with Sequelize, install the CLI globally:

  ```bash
npm install -g sequelize-cli
  ```

  Database: You’ll need a compatible relational database configured.

##  Getting Started

  Clone the repository:

  ```bash

git clone https://github.com/Eallekors/web_shop
cd <repository-name>
```
Install dependencies:

```bash

npm install
```
Configure database variables:

Set up the db file in the project folder util with your database configuration:


Setup the database:

Ensure your database is running, then run the following command to start the application. It will automatically synchronize the database models:

```bash

node index.js
```
The application will automatically sync models and create a default user with a cart if none exists.
