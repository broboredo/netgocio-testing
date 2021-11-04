# NETGÓCIO - Teste

## Requirements
- php 7+
- mysql 8
- composer 2
- node v12
- npm 6

## To run project
- In you MySQL database, create a database
- Run `cp .env.example .env` to register your environment vars to application
- Update .env file with your database informations
- Run `composer install` to install php packages
- Run `npm install` to install javascript packages
- Run `php artisan key:generate` to generate an encryption key
- Run `php artisan migrate` to migrate the tables in your database
- Run `php artisan serve` to run application in your PC (default: http://localhost:8000)
